'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Home, Ticket } from "lucide-react";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Get payment details from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    
    if (!reference) {
      // If no reference, redirect to home
      router.push('/');
    }
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-[#c8a882]/10 rounded-full">
            <CheckCircle className="w-10 h-10 text-[#c8a882]" />
          </div>

          {/* Success Message */}
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-[#2a2420]">
            Payment Successful
          </h1>
          
          <p className="text-xl text-[#6b5d52] mb-12 leading-relaxed max-w-lg mx-auto">
            Thank you for your purchase! Your Cake & Sip 2.0 tickets have been confirmed.
          </p>

          {/* Ticket Details Card */}
          <div className="bg-white p-8 md:p-12 rounded-xl border border-[#e5ddd3] mb-8 text-left shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Ticket className="w-8 h-8 text-[#c8a882]" />
              <h3 className="font-serif text-2xl text-[#2a2420]">
                Booking Confirmation
              </h3>
            </div>
            
            <div className="space-y-4 text-lg">
              <div className="flex justify-between pb-4 border-b border-[#e5ddd3]">
                <span className="text-[#8b7d72]">Event:</span>
                <span className="font-medium text-[#2a2420]">Cake & Sip 2.0</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-[#e5ddd3]">
                <span className="text-[#8b7d72]">Date:</span>
                <span className="font-medium text-[#2a2420]">April 6th, 2026</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-[#e5ddd3]">
                <span className="text-[#8b7d72]">Time:</span>
                <span className="font-medium text-[#2a2420]">2:00 PM Prompt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b7d72]">Venue:</span>
                <span className="font-medium text-[#2a2420] text-right max-w-xs">7/11 Oludegun Avenue, Airport road/Dini connection event center hall Ikeja Lagos</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              className="w-full py-6 bg-[#c8a882] hover:bg-[#b89872] text-white font-medium tracking-wide transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-[#2a2420] rounded-xl border border-[#4a4238]">
            <p className="text-[#d4cbc0] leading-relaxed">
              <span className="font-semibold text-[#c8a882]">Important:</span> A confirmation email with your ticket details has been sent to your registered email address from Paystack. Please keep this email for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
