import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema, ttsRequestSchema } from "@shared/schema";
import { generateTutorResponse, generateSpeech } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint - generates AI tutor response
  app.post("/api/chat", async (req, res) => {
    try {
      const result = chatMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request", details: result.error });
      }

      const { message } = result.data;
      const response = await generateTutorResponse(message);

      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate response";
      res.status(500).json({ error: "Failed to generate response", message: errorMessage });
    }
  });

  // TTS endpoint - generates audio from text using Google Cloud TTS
  app.post("/api/tts", async (req, res) => {
    try {
      const result = ttsRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request", details: result.error });
      }

      const { text } = result.data;
      
      // Generate speech audio
      const audioBuffer = await generateSpeech(text);

      // Set appropriate headers for MP3 audio
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
      });

      // Send the audio buffer
      res.send(audioBuffer);
    } catch (error) {
      console.error("TTS error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate speech";
      res.status(500).json({ error: "Failed to generate speech", message: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
