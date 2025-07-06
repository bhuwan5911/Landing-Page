// server/index.ts

import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import router from "./routes";
import { createServer } from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======= Middlewares =======
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======= Register routes & Start Server =======
(async () => {
  try {
    await connectDB();
    const server = createServer(app);

    // Register all routes
    app.use(router);

    // Serve static files from React build (always, not just in production)
    const __dirname = path.resolve();
    const clientBuildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(clientBuildPath));
    app.get("/", (_req, res) => {
      res.send("✅ Backend is working!");
    });
    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(clientBuildPath, "index.html"));
    // });

    // Start server
    server.listen(Number(PORT), '0.0.0.0', () => {
      console.log("===================================");
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🌱 Environment: ${process.env.NODE_ENV}`);
      console.log("===================================");
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
})();
