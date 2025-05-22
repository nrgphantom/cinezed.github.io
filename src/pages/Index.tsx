
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecommendationGrid from "@/components/RecommendationGrid";
import MediaDetailsModal from "@/components/MediaDetailsModal";
import Footer from "@/components/Footer";
import { RecommendationProvider, useRecommendationContext } from "@/context/RecommendationContext";

const IndexContent: React.FC = () => {
  const { results, isLoading, genreMap } = useRecommendationContext();
  
  return (
    <div className="min-h-screen flex flex-col bg-cinezed-dark text-white">
      <Header />
      <Hero />
      <RecommendationGrid 
        results={results} 
        isLoading={isLoading} 
        genreMap={genreMap} 
      />
      <MediaDetailsModal />
      <Footer />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <RecommendationProvider>
      <IndexContent />
    </RecommendationProvider>
  );
};

export default Index;
