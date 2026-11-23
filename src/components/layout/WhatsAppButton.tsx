import { MessageCircle } from "lucide-react";
import { company } from "@/content/company";

export function WhatsAppButton() {
  const text = encodeURIComponent("Hello Krishna Builder, I would like to make an enquiry.");
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Krishna Builder on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-[#1b7a46] px-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
