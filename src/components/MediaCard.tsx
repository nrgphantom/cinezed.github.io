
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { MediaSearchResult, getImageUrl, getTitle } from "@/services/tmdb";
import { useRecommendationContext } from "@/context/RecommendationContext";

interface MediaCardProps {
  media: MediaSearchResult;
  genreMap: Record<number, string>;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, genreMap }) => {
  const { setSelectedMedia } = useRecommendationContext();
  const title = getTitle(media);
  
  // Get first 2 genres only
  const genres = media.genre_ids
    .slice(0, 2)
    .map((id) => genreMap[id] || "")
    .filter(Boolean);

  const handleClick = () => {
    setSelectedMedia({ ...media });
  };
  
  return (
    <div 
      className="poster-card rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] bg-cinezed-darker">
        <img
          src={getImageUrl(media.poster_path)}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold">
            {media.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="p-3 glass-card">
        <h3 className="font-semibold truncate text-white">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs bg-cinezed-accent/20 text-white border-cinezed-accent/40">
            {media.media_type === "movie" ? "Movie" : "TV"}
          </Badge>
          
          {genres.map((genre) => (
            <Badge 
              key={genre} 
              variant="outline" 
              className="text-xs bg-cinezed-darker/80 text-gray-300 border-gray-700"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
