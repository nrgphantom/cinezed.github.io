
import React from "react";
import MediaCard from "./MediaCard";
import MediaCardSkeleton from "./MediaCardSkeleton";
import { MediaSearchResult } from "@/services/tmdb";
import { useRecommendationContext } from "@/context/RecommendationContext";

interface RecommendationGridProps {
  results: MediaSearchResult[];
  isLoading: boolean;
  genreMap: Record<number, string>;
}

const RecommendationGrid: React.FC<RecommendationGridProps> = ({
  results,
  isLoading,
  genreMap,
}) => {
  const { searchParams } = useRecommendationContext();
  
  // Show message when no results after searching
  const showNoResults = !isLoading && searchParams && results.length === 0;
  
  // Show initial state when no search has been performed
  const showInitialState = !isLoading && !searchParams && results.length === 0;
  
  return (
    <section className="container mx-auto px-4 md:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        {isLoading ? (
          "Finding your perfect match..."
        ) : results.length > 0 ? (
          "Recommended for you"
        ) : showNoResults ? (
          "No recommendations found"
        ) : (
          "Find your next favorite"
        )}
      </h2>

      {showInitialState && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            Enter a reference title or select a mood to get personalized recommendations
          </p>
        </div>
      )}

      {showNoResults && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            We couldn't find any recommendations matching your criteria.
            Try a different title or mood.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <MediaCardSkeleton key={i} />)
          : results.map((media) => (
              <MediaCard key={media.id} media={media} genreMap={genreMap} />
            ))}
      </div>
    </section>
  );
};

export default RecommendationGrid;
