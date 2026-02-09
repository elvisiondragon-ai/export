import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WhatsAppFloat = () => {
  return (
    <Link
      to="/survey"
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 animate-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </Link>
  );
};

export default WhatsAppFloat;