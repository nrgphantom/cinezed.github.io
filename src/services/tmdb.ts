
import { toast } from "sonner";

const TMDB_API_KEY = "36d5d00990865276a947dcabecf5c43b";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface MediaSearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
  genre_ids: number[];
}

export interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genres: { id: number; name: string }[];
  imdb_id?: string;
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  runtime?: number;
  number_of_seasons?: number;
  tagline?: string;
}

export interface GenreMap {
  [key: number]: string;
}

// Search for a movie, TV show, or person
export async function searchMedia(query: string): Promise<MediaSearchResult[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter out person results and items without posters
    return data.results
      .filter((item: any) => item.media_type !== "person")
      .slice(0, 10);
      
  } catch (error) {
    console.error("Error searching media:", error);
    toast.error("Failed to search. Please try again.");
    return [];
  }
}

// Get details for a specific movie or TV show
export async function getMediaDetails(
  id: number,
  mediaType: string
): Promise<MediaDetails | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    toast.error(`Failed to load details. Please try again.`);
    return null;
  }
}

// Get a list of all genres for movies and TV
export async function getGenres(): Promise<GenreMap> {
  try {
    const [movieResponse, tvResponse] = await Promise.all([
      fetch(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`),
      fetch(`${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}`),
    ]);

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    // Combine movie and TV genres into a single map
    const genreMap: GenreMap = {};
    [...movieData.genres, ...tvData.genres].forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    return genreMap;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return {};
  }
}

// Helper function to get poster or backdrop URL
export function getImageUrl(path: string | null, size: string = "w500"): string {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to format the title (combining movie titles and TV show names)
export function getTitle(item: MediaSearchResult | MediaDetails): string {
  return item.title || item.name || "Unknown Title";
}

// Get release year from date string
export function getReleaseYear(item: MediaSearchResult | MediaDetails): string {
  const dateStr = item.release_date || item.first_air_date;
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear().toString();
}
