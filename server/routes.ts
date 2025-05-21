import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const createdMessage = await storage.createMessage(messageData);
      res.status(201).json(createdMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve messages" });
    }
  });

  app.get("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }
      
      const message = await storage.getMessageById(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
