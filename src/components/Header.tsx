
import React from "react";
import { Film } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-cinezed-accent" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            0x<span className="text-cinezed-accent">CineZed</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Movies
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Series
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Anime
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
