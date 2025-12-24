
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Itinerary, SearchParams, GroundingSource } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTravelPlan(params: SearchParams): Promise<{ itinerary: Itinerary; sources: GroundingSource[] }> {
  const prompt = `Génère un itinéraire de voyage détaillé pour Moha et Manele à destination de ${params.destination}.
  Détails :
  - Dates : ${params.dates}
  - Nombre de voyageurs : ${params.travelers}
  - Style de budget : ${params.budget}
  
  IMPORTANT : Utilise Google Search pour trouver les tarifs réels actuels pour les vols, les hôtels et les activités principales à ces dates. 
  L'itinéraire doit être en Français.`;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          duration: { type: Type.NUMBER },
          startDate: { type: Type.STRING },
          totalBudgetEstimate: { type: Type.STRING },
          currency: { type: Type.STRING },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                date: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      estimatedCost: { type: Type.STRING },
                      location: { type: Type.STRING },
                    },
                  },
                },
              },
            },
          },
          hotelRecommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                pricePerNight: { type: Type.STRING },
                rating: { type: Type.STRING },
                link: { type: Type.STRING },
              },
            },
          },
          flightEstimates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                airline: { type: Type.STRING },
                route: { type: Type.STRING },
                priceRange: { type: Type.STRING },
              },
            },
          },
        },
        required: ["destination", "itinerary", "hotelRecommendations", "flightEstimates"],
      },
    },
  });

  const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter((chunk: any) => chunk.web)
    ?.map((chunk: any) => ({
      title: chunk.web.title,
      uri: chunk.web.uri,
    })) || [];

  return {
    itinerary: JSON.parse(response.text),
    sources,
  };
}
