import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918142452633"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Call Now Button */}
      <a
        href="tel:+919876543210"
        className="bg-accent hover:bg-accent/90 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        title="Call Now"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
