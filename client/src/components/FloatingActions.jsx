import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const FloatingActions = () => {
  const phoneClean = "09417511727";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919417511727";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Goel Paints, I am interested in inquiring about paint & hardware availability."
  )}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:hidden">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Store"
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-95 border-2 border-white"
      >
        <MessageSquare className="h-6 w-6 fill-current" />
      </a>

      {/* Call Floating Button */}
      <a
        href={`tel:${phoneClean}`}
        aria-label="Call Store"
        className="bg-brand-yellow hover:bg-amber-400 text-brand-blue p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-95 border-2 border-white"
      >
        <Phone className="h-6 w-6 fill-current" />
      </a>
    </div>
  );
};

export default FloatingActions;
