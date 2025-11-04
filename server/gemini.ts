import { GoogleGenAI } from "@google/genai";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Initialize Google Cloud Text-to-Speech client
// Using API key authentication (simpler than service account)
const ttsClient = process.env.GOOGLE_CLOUD_TTS_API_KEY 
  ? new TextToSpeechClient({
      apiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY
    })
  : null;

export async function generateTutorResponse(message: string): Promise<string> {
  const systemPrompt = `You are an expert AI tutor specializing in Math, Physics, Chemistry, and Biology. 
Your role is to:
- Explain concepts clearly and concisely
- Use examples when helpful
- Break down complex topics into understandable steps
- Be encouraging and supportive
- When explaining formulas, use plain text notation (e.g., a² + b² = c²)
- Keep responses focused and educational`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    return response.text || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating tutor response:", error);
    throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function generateSpeech(text: string): Promise<Buffer> {
  if (!ttsClient) {
    throw new Error("Google Cloud TTS API key not configured. Please set GOOGLE_CLOUD_TTS_API_KEY environment variable.");
  }

  try {
    // Configure the TTS request with Neural2 voice (most natural)
    const request = {
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Neural2-F', // Female Neural2 voice (very natural)
        // Alternative voices:
        // 'en-US-Neural2-A' - Male
        // 'en-US-Neural2-C' - Male
        // 'en-US-Neural2-D' - Male
        // 'en-US-Neural2-E' - Female
        // 'en-US-Neural2-F' - Female
        // 'en-US-Neural2-G' - Female
        // 'en-US-Neural2-H' - Female
        // 'en-US-Neural2-I' - Male
        // 'en-US-Neural2-J' - Male
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        speakingRate: 1.0, // Normal speed
        pitch: 0.0, // Normal pitch
        volumeGainDb: 0.0, // Normal volume
      },
    };

    // Perform the Text-to-Speech request
    const [response] = await ttsClient.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error("No audio content received from TTS API");
    }

    // Return the audio content as a Buffer
    return Buffer.from(response.audioContent);
  } catch (error) {
    console.error("Error generating speech:", error);
    throw new Error(`Failed to generate speech: ${error instanceof Error ? error.message : String(error)}`);
  }
}
