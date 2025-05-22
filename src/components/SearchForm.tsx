
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRecommendationContext } from "@/context/RecommendationContext";

const MOOD_OPTIONS = [
  "Action-packed",
  "Adventurous",
  "Calm",
  "Cheerful",
  "Comedic",
  "Dark",
  "Dramatic",
  "Emotional",
  "Epic",
  "Exciting",
  "Feel-good",
  "Heart-warming",
  "Inspirational",
  "Intense",
  "Melancholic",
  "Mysterious",
  "Nostalgic",
  "Quirky",
  "Romantic",
  "Scary",
  "Suspenseful",
  "Thought-provoking",
  "Thrilling",
  "Uplifting",
];

const SearchForm: React.FC = () => {
  const { fetchRecommendations, isLoading } = useRecommendationContext();
  const [referenceTitle, setReferenceTitle] = useState("");
  const [mood, setMood] = useState<string | undefined>();
  const [searchMode, setSearchMode] = useState<"reference" | "mood" | "both">("both");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchMode === "reference" && !referenceTitle) {
      toast.error("Please enter a reference title");
      return;
    }
    
    if (searchMode === "mood" && !mood) {
      toast.error("Please select a mood");
      return;
    }
    
    if (searchMode === "both" && !referenceTitle && !mood) {
      toast.error("Please enter a title or select a mood");
      return;
    }
    
    fetchRecommendations({
      referenceTitle: searchMode === "mood" ? undefined : referenceTitle,
      mood: searchMode === "reference" ? undefined : mood,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-3xl bg-cinezed-card/80 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-lg"
    >
      <div className="mb-4">
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={searchMode === "both" ? "default" : "outline"}
            onClick={() => setSearchMode("both")}
            className={`${searchMode === "both" ? "bg-cinezed-accent text-white" : "text-gray-300"}`}
          >
            Title & Mood
          </Button>
          <Button
            type="button"
            variant={searchMode === "reference" ? "default" : "outline"}
            onClick={() => setSearchMode("reference")}
            className={`${searchMode === "reference" ? "bg-cinezed-accent text-white" : "text-gray-300"}`}
          >
            Title Only
          </Button>
          <Button
            type="button"
            variant={searchMode === "mood" ? "default" : "outline"}
            onClick={() => setSearchMode("mood")}
            className={`${searchMode === "mood" ? "bg-cinezed-accent text-white" : "text-gray-300"}`}
          >
            Mood Only
          </Button>
        </div>
      </div>

      <div className="grid gap-4 mb-4 md:grid-cols-2">
        {(searchMode === "both" || searchMode === "reference") && (
          <div>
            <label htmlFor="referenceTitle" className="block mb-2 text-sm font-medium text-gray-300">
              Reference Title
            </label>
            <Input
              id="referenceTitle"
              placeholder="e.g., Breaking Bad, Inception"
              value={referenceTitle}
              onChange={(e) => setReferenceTitle(e.target.value)}
              disabled={isLoading}
              className="bg-cinezed-darker/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        )}

        {(searchMode === "both" || searchMode === "mood") && (
          <div>
            <label htmlFor="mood" className="block mb-2 text-sm font-medium text-gray-300">
              Mood
            </label>
            <Select
              value={mood}
              onValueChange={setMood}
              disabled={isLoading}
            >
              <SelectTrigger 
                id="mood" 
                className="bg-cinezed-darker/50 border-gray-700 text-white"
              >
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent className="bg-cinezed-darker border-gray-700 text-white">
                <SelectGroup>
                  {MOOD_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-cinezed-accent hover:bg-cinezed-accent/80 text-white py-2 rounded-md transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Finding matches..." : "Get Recommendations"}
      </Button>
    </form>
  );
};

export default SearchForm;
