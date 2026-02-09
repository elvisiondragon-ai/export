import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const phone = "62895325633487";
  const message = encodeURIComponent(
    "Hi Renata, I would like to Join Export Global as (Seller / Buyer)"
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 animate-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
};

export default WhatsAppFloat;
