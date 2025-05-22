
import React from "react";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Film className="h-8 w-8 text-cinezed-accent" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              0x<span className="text-cinezed-accent">CineZed</span>
            </h1>
          </Link>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto md:max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
