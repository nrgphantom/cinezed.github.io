
import React from "react";
import NewsletterSignup from "./NewsletterSignup";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-cinezed-darker border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <NewsletterSignup />
          
          <div className="flex flex-col items-start md:items-end">
            <p className="text-gray-400 text-sm mb-2">
              Stay connected with the latest in film and television
            </p>
            <p className="text-gray-500 text-xs">
              Discover the best content tailored to your preferences
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} 0xCineZed. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-xs">
              Powered by TMDB API, OpenAI, and OMDB
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB" 
                className="h-3" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
