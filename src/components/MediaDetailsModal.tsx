
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Star, 
  Clock, 
  Calendar, 
  Link as LinkIcon, 
  Play 
} from "lucide-react";
import { 
  getImageUrl, 
  getMediaDetails, 
  MediaDetails as TmdbDetails, 
  getTitle 
} from "@/services/tmdb";
import { getDetailsByImdbId, OMDBDetails } from "@/services/omdb";
import { useRecommendationContext } from "@/context/RecommendationContext";

const MediaDetailsModal: React.FC = () => {
  const { selectedMedia, setSelectedMedia } = useRecommendationContext();
  const [details, setDetails] = useState<TmdbDetails | null>(null);
  const [omdbDetails, setOmdbDetails] = useState<OMDBDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedMedia) return;
      
      setLoading(true);
      try {
        // Fetch TMDB details
        const mediaType = selectedMedia.media_type;
        const mediaDetails = await getMediaDetails(selectedMedia.id, mediaType);
        setDetails(mediaDetails);
        
        // Find trailer if available
        if (mediaDetails?.videos?.results) {
          const trailer = mediaDetails.videos.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) setTrailerKey(trailer.key);
        }
        
        // Fetch OMDB details if IMDB ID is available
        if (mediaDetails?.imdb_id) {
          const omdbData = await getDetailsByImdbId(mediaDetails.imdb_id);
          setOmdbDetails(omdbData);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [selectedMedia]);
  
  if (!selectedMedia) return null;
  
  const title = details ? getTitle(details) : getTitle(selectedMedia);
  const backdropUrl = getImageUrl(
    details?.backdrop_path || selectedMedia.backdrop_path,
    "w1280"
  );
  const posterUrl = getImageUrl(
    details?.poster_path || selectedMedia.poster_path,
    "w500"
  );
  
  const rating = omdbDetails?.imdbRating || (details?.vote_average.toFixed(1) || selectedMedia.vote_average.toFixed(1));
  const year = details?.release_date?.substring(0, 4) || details?.first_air_date?.substring(0, 4) || "";
  
  return (
    <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-cinezed-darker text-white">
        {/* Backdrop image */}
        <div className="relative w-full h-48 md:h-72 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinezed-darker to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 rounded-full bg-black/40 text-white hover:bg-black/60 z-10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Left column - Poster & metadata */}
          <div className="md:col-span-1">
            <div className="aspect-[2/3] rounded-lg overflow-hidden mb-4 shadow-lg">
              <img
                src={posterUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{rating}</span>
                {omdbDetails?.imdbID && (
                  <a
                    href={`https://www.imdb.com/title/${omdbDetails.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-yellow-400 hover:text-yellow-300 flex items-center gap-1 text-xs"
                  >
                    <span>IMDb</span>
                    <LinkIcon className="h-3 w-3" />
                  </a>
                )}
              </div>
              
              {(details?.runtime || omdbDetails?.Runtime) && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{details?.runtime ? `${details.runtime} min` : omdbDetails?.Runtime}</span>
                </div>
              )}
              
              {year && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{year}</span>
                </div>
              )}
              
              {trailerKey && (
                <Button
                  className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Trailer
                </Button>
              )}
            </div>
          </div>

          {/* Right column - Title & description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            
            {details?.tagline && (
              <p className="text-gray-400 italic mb-4">{details.tagline}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {details?.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="bg-cinezed-dark text-gray-300 border-gray-700"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-gray-300 mb-6">{details?.overview || selectedMedia.overview}</p>
            
            {omdbDetails?.Director && omdbDetails.Director !== "N/A" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-300 mb-4">{omdbDetails.Director}</p>
              </>
            )}
            
            {omdbDetails?.Actors && omdbDetails.Actors !== "N/A" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-gray-300">{omdbDetails.Actors}</p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaDetailsModal;
