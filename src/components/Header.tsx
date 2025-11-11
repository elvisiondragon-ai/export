import { Package } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <Package className="h-6 w-6" />
        <div>
          <h1 className="text-xl font-bold">UAE INTERNATIONAL GOODS</h1>
          <p className="text-sm opacity-90">{title}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
