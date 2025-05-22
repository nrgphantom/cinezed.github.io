
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { 
  MediaSearchResult,
  getGenres, 
  searchMedia 
} from "@/services/tmdb";
import { getRecommendations } from "@/services/openai";

interface SearchParams {
  referenceTitle?: string;
  mood?: string;
}

interface RecommendationContextType {
  results: MediaSearchResult[];
  isLoading: boolean;
  searchParams: SearchParams | null;
  genreMap: Record<number, string>;
  selectedMedia: MediaSearchResult | null;
  setSelectedMedia: (media: MediaSearchResult | null) => void;
  fetchRecommendations: (params: SearchParams) => Promise<void>;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<MediaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});
  const [selectedMedia, setSelectedMedia] = useState<MediaSearchResult | null>(null);

  // Load genres when context is initialized
  React.useEffect(() => {
    const loadGenres = async () => {
      const genres = await getGenres();
      setGenreMap(genres);
    };
    loadGenres();
  }, []);

  const fetchRecommendations = async (params: SearchParams) => {
    setIsLoading(true);
    setSearchParams(params);
    setResults([]);
    
    try {
      // Get recommendations from OpenAI
      const titleRecommendations = await getRecommendations({
        referenceTitle: params.referenceTitle,
        mood: params.mood,
        limit: 10,
      });
      
      if (!titleRecommendations || titleRecommendations.length === 0) {
        setIsLoading(false);
        return;
      }
      
      // Fetch details for each recommendation from TMDB
      const mediaPromises = titleRecommendations.map(title => searchMedia(title));
      const mediaResults = await Promise.all(mediaPromises);
      
      // Flatten and filter out empty results
      const combinedResults = mediaResults
        .flatMap(result => result.length > 0 ? [result[0]] : [])
        .filter(Boolean);
      
      setResults(combinedResults);
    } catch (error) {
      console.error("Error in recommendation process:", error);
      toast.error("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    results,
    isLoading,
    searchParams,
    genreMap,
    selectedMedia,
    setSelectedMedia,
    fetchRecommendations,
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendationContext = (): RecommendationContextType => {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error("useRecommendationContext must be used within a RecommendationProvider");
  }
  return context;
};
