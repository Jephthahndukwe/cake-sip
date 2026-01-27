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

const TicketForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'solo' | 'besties'>('solo');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cakeFlavors: [] as string[],
    decorationColor: "",
    cakeTopper: "",
    cakeName: "",
  });

  const ticketPrices = {
    solo: 25500,
    besties: 45500
  };

  const totalAmount = activeTab === 'solo' ? ticketPrices.solo * quantity : ticketPrices.besties;

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
                quantity: activeTab === 'solo' ? quantity : 1,
                amount: totalAmount,
                reference: response.reference,
                cakeFlavors: formData.cakeFlavors,
                decorationColor: formData.decorationColor,
                cakeTopper: formData.cakeTopper,
                cakeName: formData.cakeName,
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
              display_name: "Quantity",
              variable_name: "quantity",
              value: activeTab === 'solo' ? quantity : 1
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
    <section id="ticket-form" className="py-24 bg-white">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-[#c8a882] text-sm tracking-[0.2em] uppercase mb-4 block">
              Tickets
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#2a2420] mb-6">
              Reserve Your Spot
            </h2>
            <p className="text-[#6b5d52] text-lg">
              Choose your ticket type and secure your place at this exclusive event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#f5f1ed] border border-[#e5ddd3]">
            {/* Ticket Type Selector */}
            <div className="grid grid-cols-2 border-b border-[#e5ddd3]">
              <button
                type="button"
                onClick={() => setActiveTab('solo')}
                className={`p-8 text-left transition-colors ${
                  activeTab === 'solo'
                    ? 'bg-[#2a2420] text-white'
                    : 'bg-[#f5f1ed] text-[#2a2420] hover:bg-[#ebe7e2]'
                }`}
              >
                <div className="text-xs tracking-[0.2em] uppercase mb-2 opacity-60">
                  Individual
                </div>
                <div className="text-2xl mb-2">Solo Ticket</div>
                <div className="text-3xl font-serif">₦{ticketPrices.solo.toLocaleString()}</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('besties')}
                className={`p-8 text-left border-l border-[#e5ddd3] transition-colors ${
                  activeTab === 'besties'
                    ? 'bg-[#2a2420] text-white'
                    : 'bg-[#f5f1ed] text-[#2a2420] hover:bg-[#ebe7e2]'
                }`}
              >
                <div className="text-xs tracking-[0.2em] uppercase mb-2 opacity-60">
                  For Two
                </div>
                <div className="text-2xl mb-2">Besties Ticket</div>
                <div className="text-3xl font-serif">₦{ticketPrices.besties.toLocaleString()}</div>
              </button>
            </div>

            {/* Form Content */}
            <div className="py-8 px-4 md:p-12 space-y-8">
              {/* Quantity for Solo */}
              {activeTab === 'solo' && (
                <div>
                  <Label className="text-xs tracking-[0.1em] uppercase text-[#6b5d52] mb-3 block">
                    Number of Tickets
                  </Label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                    disabled={loading}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Ticket' : 'Tickets'} — ₦{(ticketPrices.solo * num).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs tracking-[0.1em] uppercase text-[#6b5d52] mb-3 block">
                    Full Name *
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label className="text-xs tracking-[0.1em] uppercase text-[#6b5d52] mb-3 block">
                    Phone Number *
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs tracking-[0.1em] uppercase text-[#6b5d52] mb-3 block">
                  Email Address *
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Cake Customization */}
              <div className="border-t border-[#e5ddd3] pt-8 mt-8">
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#6b5d52] mb-6">
                  Customize Your Cake
                </h3>

                {/* Cake Flavors */}
                <div className="mb-8">
                  <Label className="text-sm text-[#2a2420] mb-4 block">
                    Select Two Cake Flavors
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['VANILLA CAKE', 'CHOCOLATE CAKE', 'RED VELVET CAKE', 'LEMON CAKE'].map((flavor) => (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => handleCakeFlavorChange(flavor)}
                        className={`p-4 text-left border transition-colors ${
                          formData.cakeFlavors.includes(flavor)
                            ? 'border-[#c8a882] bg-[#c8a882]/10'
                            : 'border-[#d4cbc0] hover:border-[#c8a882]/50'
                        }`}
                        disabled={loading || (!formData.cakeFlavors.includes(flavor) && formData.cakeFlavors.length >= 2)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#2a2420]">{flavor}</span>
                          {formData.cakeFlavors.includes(flavor) && (
                            <Check className="w-4 h-4 text-[#c8a882]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decoration Color */}
                <div className="mb-8">
                  <Label className="text-sm text-[#2a2420] mb-4 block">
                    Decoration Color (paired with white)
                  </Label>
                  <select
                    name="decorationColor"
                    value={formData.decorationColor}
                    onChange={handleSelectChange}
                    className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                    disabled={loading}
                  >
                    <option value="">Select a color</option>
                    <option value="BLUE">Blue</option>
                    <option value="YELLOW">Yellow</option>
                    <option value="RED">Red</option>
                    <option value="BLACK">Black</option>
                    <option value="BROWN">Brown</option>
                    <option value="ROYAL BLUE">Royal Blue</option>
                  </select>
                </div>

                {/* Cake Topper */}
                <div className="mb-8">
                  <Label className="text-sm text-[#2a2420] mb-4 block">
                    Choose Your Cake Topper
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'SPRINKLE', name: 'Sprinkle', image: '/images/cake.jpg' },
                      { id: 'RIBBON', name: 'Ribbon', image: '/images/cake2.jpg' },
                      { id: 'ICE CREAM CONE', name: 'Ice Cream', image: '/images/cake3.jpg' },
                      { id: 'CHOCOLATE DRIPPING', name: 'Chocolate', image: '/images/cake4.jpg' }
                    ].map((topper) => (
                      <button
                        key={topper.id}
                        type="button"
                        onClick={() => setFormData({...formData, cakeTopper: topper.id})}
                        className={`relative aspect-square border-2 transition-all ${
                          formData.cakeTopper === topper.id
                            ? 'border-[#c8a882]'
                            : 'border-[#d4cbc0] hover:border-[#c8a882]/50'
                        }`}
                        disabled={loading}
                      >
                        <img
                          src={topper.image}
                          alt={topper.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2420]/60 to-transparent flex items-end p-3">
                          <span className="text-white text-xs">{topper.name}</span>
                        </div>
                        {formData.cakeTopper === topper.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#c8a882] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cake Name */}
                <div>
                  <Label className="text-sm text-[#2a2420] mb-4 block">
                    Name for Cake Decoration (Optional)
                  </Label>
                  <Input
                    name="cakeName"
                    type="text"
                    value={formData.cakeName}
                    onChange={handleInputChange}
                    placeholder="e.g., Happy Birthday Sarah"
                    className="w-full px-4 py-4 border border-[#d4cbc0] bg-white text-[#2a2420] focus:border-[#c8a882] focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Total & Submit */}
              <div className="border-t border-[#e5ddd3] pt-8 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs tracking-[0.1em] uppercase text-[#6b5d52] mb-1">
                      Total Amount
                    </div>
                    <div className="text-4xl font-serif text-[#2a2420]">
                      ₦{totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-[#c8a882] hover:bg-[#b89872] text-white font-medium tracking-wide transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Complete Purchase — ₦${totalAmount.toLocaleString()}`
                  )}
                </Button>

                <p className="text-xs text-center text-[#8b7d72] mt-4">
                  Secure payment powered by Paystack
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TicketForm;
