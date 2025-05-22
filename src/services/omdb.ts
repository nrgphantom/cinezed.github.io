
import { toast } from "sonner";

const OMDB_API_KEY = "ee68bf2f";
const BASE_URL = "https://www.omdbapi.com/";

export interface OMDBDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

// Get detailed information about a movie or show from OMDB using IMDb ID
export async function getDetailsByImdbId(imdbId: string): Promise<OMDBDetails | null> {
  try {
    const response = await fetch(
      `${BASE_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`OMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      console.error("OMDB error:", data.Error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching OMDB details:", error);
    toast.error("Failed to load additional details");
    return null;
  }
}

// Get detailed information about a movie or show from OMDB by title
export async function getDetailsByTitle(title: string): Promise<OMDBDetails | null> {
  try {
    const response = await fetch(
      `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`OMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      console.error("OMDB error:", data.Error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching OMDB details:", error);
    return null;
  }
}
