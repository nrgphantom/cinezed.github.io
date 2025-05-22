
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
      </div>
    </header>
  );
};

export default Header;
