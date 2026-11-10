"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";
import { PaymentService } from "@/lib/payment-service";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

type TicketType = 'single' | 'bestie' | 'group';
type AttendeeType = 'decorator' | 'guest';

// Ticket prices in Naira. Decorator prices are from the 3.0 flyer.
// TODO: confirm the vibes-only (non-decorator) prices with the organiser.
const PRICES: Record<AttendeeType, Record<TicketType, number>> = {
  decorator: { single: 28500, bestie: 55000, group: 100000 },
  guest: { single: 15000, bestie: 28000, group: 52000 },
};

const KINDS: Record<AttendeeType, { label: string; emoji: string; blurb: string }> = {
  decorator: { label: 'Cake Decorator', emoji: '🎂', blurb: 'Decorate your own cake + all the vibes. You take the cake home!' },
  guest: { label: 'Vibes Only', emoji: '🍹', blurb: 'Sip, music, games & giveaways. No cake decorating.' },
};

const TIERS: { id: TicketType; label: string; sub: string; style: string }[] = [
  { id: 'single', label: 'Single', sub: 'just me & my drip', style: 'bg-cream text-denim-950 -rotate-2' },
  { id: 'bestie', label: 'Bestie / Couple', sub: 'for two', style: 'bg-gold text-denim-950 rotate-1' },
  { id: 'group', label: 'Group of 4', sub: 'the whole squad', style: 'bg-hotpink text-white -rotate-1' },
];

const field = "w-full h-auto rounded-xl border-2 border-denim-950 bg-white px-4 py-4 text-denim-950 font-medium placeholder:text-denim-950/40 focus:border-hotpink focus:outline-none focus:ring-4 focus:ring-hotpink/20 transition";
const lbl = "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-denim-950";

const TicketForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TicketType>('single');
  const [attendeeType, setAttendeeType] = useState<AttendeeType>('decorator');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cakeFlavors: [] as string[],
    decorationColor: "",
    cakeTopper: "",
    cakeName: "",
    karaokeInterested: false,
    karaokeSongChoice: "",
  });

  const tier = TIERS.find(t => t.id === activeTab)!;
  const unitPrice = PRICES[attendeeType][activeTab];
  const totalAmount = activeTab === 'single' ? unitPrice * quantity : unitPrice;
  const isDecorator = attendeeType === 'decorator';

  useEffect(() => {
    const loadPaystackScript = () => {
      return new Promise((resolve, reject) => {
        if (window.PaystackPop) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Paystack script'));
        
        document.body.appendChild(script);
      });
    };

    loadPaystackScript().catch(error => {
      toast({
        title: "Loading Error",
        description: "Failed to load payment system. Please refresh the page.",
        variant: "destructive",
      });
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCakeFlavorChange = (flavor: string) => {
    setFormData(prev => ({
      ...prev,
      cakeFlavors: prev.cakeFlavors.includes(flavor)
        ? prev.cakeFlavors.filter(f => f !== flavor)
        : [...prev.cakeFlavors, flavor].slice(0, 2)
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (!window.PaystackPop) {
        throw new Error('Paystack script not loaded. Please refresh the page and try again.');
      }

      console.log('Initializing Paystack with amount:', totalAmount * 100);

      const paystackHandler = {
        callback: function(response: any) {
          console.log('Paystack callback triggered:', response);
          
          const processPayment = async () => {
            try {
              const paymentData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                ticketType: activeTab,
                attendeeType,
                quantity: activeTab === 'single' ? quantity : 1,
                amount: totalAmount,
                reference: response.reference,
                cakeFlavors: isDecorator ? formData.cakeFlavors : [],
                decorationColor: isDecorator ? formData.decorationColor : '',
                cakeTopper: isDecorator ? formData.cakeTopper : '',
                cakeName: isDecorator ? formData.cakeName : '',
                karaokeInterested: formData.karaokeInterested,
                karaokeSongChoice: formData.karaokeSongChoice,
              };

              const dbResult = await PaymentService.processPayment(paymentData);
              
              if (dbResult.success) {
                toast({
                  title: "Payment Successful!",
                  description: `Transaction reference: ${response.reference}`,
                  variant: "default",
                });
                
                window.location.href = `/success?reference=${response.reference}`;
              } else {
                throw new Error(dbResult.error || 'Failed to save payment');
              }
            } catch (error) {
              console.error('Error in payment callback:', error);
              toast({
                title: "Payment Processed",
                description: `Payment successful but there was an issue saving your details. Reference: ${response.reference}`,
                variant: "default",
              });
              
              window.location.href = `/success?reference=${response.reference}`;
            }
            
            setLoading(false);
          };

          processPayment();
        },
        onClose: function() {
          toast({
            title: "Payment Cancelled",
            description: "You have cancelled the payment process",
            variant: "destructive",
          });
          setLoading(false);
        }
      };

      const handler = window.PaystackPop.setup({
        key: 'pk_live_84ea73b42140d079929e4084e09b19daf2eff604',
        email: formData.email,
        amount: totalAmount * 100,
        currency: 'NGN',
        ref: `CAKE_SIP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phone
            },
            {
              display_name: "Ticket Type",
              variable_name: "ticket_type",
              value: activeTab
            },
            {
              display_name: "Attendee Type",
              variable_name: "attendee_type",
              value: attendeeType
            },
            {
              display_name: "Quantity",
              variable_name: "quantity",
              value: activeTab === 'single' ? quantity : 1
            }
          ]
        },
        callback: paystackHandler.callback,
        onClose: paystackHandler.onClose
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <section id="ticket-form" className="denim-dark py-24">
      <div className="container px-5">
        <div className="text-center mb-12">
          <p className="font-[family-name:var(--font-marker)] text-gold text-2xl -rotate-2">don&apos;t sleep on this</p>
          <h2 className="font-[family-name:var(--font-display)] uppercase text-5xl sm:text-7xl text-cream">
            Cop your <span className="text-hotpink">ticket</span>
          </h2>
        </div>

        {/* Step 1: ticket kind */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-denim-300 mb-4">Step 1 · How are you rolling?</p>
        <div className="mx-auto max-w-3xl grid gap-5 sm:grid-cols-2 mb-14">
          {(Object.keys(KINDS) as AttendeeType[]).map((k, i) => {
            const on = attendeeType === k;
            const kind = KINDS[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() => setAttendeeType(k)}
                disabled={loading}
                className={`relative rounded-3xl p-6 text-left sticker stitch transition cursor-pointer ${i ? 'rotate-1 bg-denim-500 text-white' : '-rotate-1 bg-hotpink text-white'} ${on ? 'scale-105 rotate-0 ring-4 ring-gold ring-offset-4 ring-offset-denim-950' : 'opacity-70 hover:opacity-100'}`}
              >
                {on && <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-denim-950 sticker"><Check className="h-5 w-5" /></span>}
                <div className="text-4xl">{kind.emoji}</div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase">{kind.label}</div>
                <div className="mt-1 font-medium opacity-90">{kind.blurb}</div>
              </button>
            );
          })}
        </div>

        {/* Step 2: tier */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-denim-300 mb-4">Step 2 · Who&apos;s coming?</p>
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-3 mb-12">
          {TIERS.map(t => {
            const on = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                disabled={loading}
                className={`${t.style} relative rounded-3xl p-7 text-left sticker transition cursor-pointer ${on ? 'scale-105 ring-4 ring-offset-4 ring-offset-denim-950 ring-hotpink rotate-0' : 'opacity-80 hover:opacity-100 hover:rotate-0'}`}
              >
                {on && <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-denim-500 text-white sticker"><Check className="h-5 w-5" /></span>}
                <div className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">{t.sub}</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-3xl uppercase">{t.label}</div>
                <div className="mt-3 font-[family-name:var(--font-display)] text-5xl">₦{PRICES[attendeeType][t.id].toLocaleString()}</div>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-[2rem] denim-light text-denim-950 p-6 sm:p-12 stitch sticker space-y-8">
          {activeTab === 'single' && (
            <div>
              <Label className={lbl}>How many tickets?</Label>
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={field} disabled={loading}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'ticket' : 'tickets'} — ₦{(unitPrice * num).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className={lbl}>Your name *</Label>
              <Input name="name" type="text" value={formData.name} onChange={handleInputChange} required className={field} disabled={loading} placeholder="What do we call you?" />
            </div>
            <div>
              <Label className={lbl}>Phone *</Label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className={field} disabled={loading} placeholder="080..." />
            </div>
          </div>
          <div>
            <Label className={lbl}>Email *</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className={field} disabled={loading} placeholder="you@email.com" />
          </div>

          {attendeeType === 'decorator' ? (
            <div className="border-t-2 border-dashed border-denim-950/40 pt-8">
              <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase">Design your cake <span className="font-[family-name:var(--font-marker)] normal-case text-hotpink text-2xl">🎂</span></h3>

              <div className="mt-6">
                <Label className={lbl}>Pick two flavours</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['VANILLA CAKE', 'CHOCOLATE CAKE', 'RED VELVET CAKE', 'LEMON CAKE'].map((flavor) => {
                    const on = formData.cakeFlavors.includes(flavor);
                    return (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => handleCakeFlavorChange(flavor)}
                        disabled={loading || (!on && formData.cakeFlavors.length >= 2)}
                        className={`flex items-center justify-between rounded-xl border-2 border-denim-950 px-4 py-4 text-sm font-bold uppercase transition disabled:opacity-40 ${on ? 'bg-hotpink text-white sticker' : 'bg-white hover:bg-cream'}`}
                      >
                        {flavor.replace(' CAKE', '')}
                        {on && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <Label className={lbl}>Decoration colour (paired with white)</Label>
                <select name="decorationColor" value={formData.decorationColor} onChange={handleSelectChange} className={field} disabled={loading}>
                  <option value="">Choose a colour</option>
                  <option value="BLUE">Blue</option>
                  <option value="ROYAL BLUE">Royal Blue</option>
                  <option value="YELLOW">Yellow</option>
                  <option value="RED">Red</option>
                  <option value="BLACK">Black</option>
                  <option value="BROWN">Brown</option>
                </select>
              </div>

              <div className="mt-6">
                <Label className={lbl}>Choose your topper</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'SPRINKLE', name: 'Sprinkle', image: '/images/cake.jpg' },
                    { id: 'RIBBON', name: 'Ribbon', image: '/images/cake2.jpg' },
                    { id: 'ICE CREAM CONE', name: 'Ice Cream', image: '/images/cake3.jpg' },
                    { id: 'CHOCOLATE DRIPPING', name: 'Choco Drip', image: '/images/cake4.jpg' },
                  ].map((topper, i) => {
                    const on = formData.cakeTopper === topper.id;
                    return (
                      <button
                        key={topper.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, cakeTopper: topper.id })}
                        disabled={loading}
                        className={`relative bg-cream p-2 pb-8 sticker transition ${i % 2 ? 'rotate-2' : '-rotate-2'} ${on ? 'ring-4 ring-hotpink rotate-0 scale-105' : 'hover:rotate-0'}`}
                      >
                        <img src={topper.image} alt={topper.name} className="aspect-square w-full object-cover" />
                        <span className="absolute bottom-1.5 left-0 right-0 font-[family-name:var(--font-marker)] text-sm">{topper.name}</span>
                        {on && <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-hotpink text-white"><Check className="h-4 w-4" /></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <Label className={lbl}>Name to write on the cake (optional)</Label>
                <Input name="cakeName" type="text" value={formData.cakeName} onChange={handleInputChange} placeholder="e.g. Chika" className={field} disabled={loading} />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-denim-950/50 bg-white/60 p-6 -rotate-1">
              <p className="font-[family-name:var(--font-marker)] text-xl text-hotpink">vibes-only gang 🍹</p>
              <p className="mt-1 font-medium">You&apos;re in for the sips, music, games, giveaways and photo moments — no cake decorating station. Change your mind? Switch to Cake Decorator above.</p>
            </div>
          )}

          <div className="rounded-2xl bg-denim-950 p-6 text-cream">
            <div className="flex flex-wrap items-end justify-between gap-2 mb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-denim-300">Total</div>
                <div className="font-[family-name:var(--font-display)] text-5xl text-gold">₦{totalAmount.toLocaleString()}</div>
              </div>
              <span className="font-[family-name:var(--font-marker)] text-hotpink text-right">
                {KINDS[attendeeType].label} · {tier.label}{activeTab === 'single' && quantity > 1 ? ` × ${quantity}` : ''}
              </span>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-auto rounded-2xl bg-hotpink py-5 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white hover:bg-hotpink/90 transition cursor-pointer"
            >
              {loading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>) : `Pay ₦${totalAmount.toLocaleString()} →`}
            </Button>
            <p className="mt-3 text-center text-xs text-cream/50">Secure payment by Paystack</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TicketForm;
