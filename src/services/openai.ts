
import { toast } from "sonner";

const OPENAI_API_KEY = "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";

interface RecommendationParams {
  referenceTitle?: string;
  mood?: string;
  limit?: number;
}

export async function getRecommendations({ 
  referenceTitle, 
  mood, 
  limit = 5 
}: RecommendationParams): Promise<string[]> {
  if (!referenceTitle && !mood) {
    toast.error("Please provide a reference title or mood");
    return [];
  }

  try {
    const prompt = constructPrompt(referenceTitle, mood, limit);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert movie, TV show, and anime recommendation system. Provide accurate recommendations based on user input. Only respond with JSON array of titles. No commentary or explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("OpenAI API error:", data);
      toast.error("Failed to get recommendations. Please try again.");
      return [];
    }

    try {
      const content = JSON.parse(data.choices[0].message.content);
      return content.recommendations || [];
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      toast.error("Failed to process recommendations. Please try again.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    toast.error("Failed to fetch recommendations. Please check your connection.");
    return [];
  }
}

function constructPrompt(referenceTitle?: string, mood?: string, limit?: number): string {
  let prompt = `Suggest ${limit} `;
  
  if (referenceTitle && mood) {
    prompt += `${mood} movies, TV shows, or anime similar to "${referenceTitle}".`;
  } else if (referenceTitle) {
    prompt += `movies, TV shows, or anime similar to "${referenceTitle}".`;
  } else if (mood) {
    prompt += `${mood} movies, TV shows, or anime.`;
  }
  
  prompt += ` Respond with a JSON object with a single key "recommendations" containing an array of exact titles. Only include the most relevant and high-quality suggestions. Format: {"recommendations": ["Title 1", "Title 2", ...]}`;
  
  return prompt;
}
