
import React from "react";
import { Button } from "@/components/ui/button";
import SearchForm from "./SearchForm";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center bg-gradient-to-b from-cinezed-dark to-cinezed-darker">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-20"></div>
      
      <div className="container mx-auto relative z-10 px-4 md:px-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Discover Your Next <span className="text-cinezed-accent">Favorite</span>
        </h1>
        
        <p className="text-lg md:text-xl text-center text-gray-300 max-w-3xl mb-8">
          Get personalized recommendations for movies, TV shows, and anime based on your preferences.
        </p>
        
        <SearchForm />
        
        <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                alt="TMDB" 
                className="h-4" />
          </span>
          <span className="h-4 w-0.5 bg-gray-700"></span>
          <span>Powered by OpenAI</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
