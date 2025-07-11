// index.ts
// Main backend server entry point. Sets up Express app, middleware, CORS, database connection, routes, and static file serving.

import express from "express";
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import { connectDB } from "./db"; // Database connection utility
import router from "./routes"; // Main API routes
// Defensive: Only import one router, do not import contactRoute.ts separately
import { createServer } from "http";
import dotenv from "dotenv"; // Loads environment variables
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======= Middlewares =======
// For development: Allow all origins (fixes CORS errors)
// WARNING: Do not use this in production! Restrict origins for security.
// Set allowed origins for CORS to only allow Vercel frontend
const allowedOrigins = [
  "https://creatorxjatin.vercel.app",
  "https://www.creatorxjatin.vercel.app"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ====== Print All Registered Route Paths (Debugging) ======
function printRoutePaths(router: any, prefix = '') {
  if (router && router.stack) {
    for (const layer of router.stack) {
      if (layer.route && layer.route.path) {
        console.log(`[ROUTE] ${prefix}${layer.route.path}`);
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        printRoutePaths(layer.handle, prefix);
      }
    }
  }
}
// ====== Route Path Validation (Permanent Fix) ======
function validateRoutePaths(router: any) {
  if (router && router.stack) {
    for (const layer of router.stack) {
      if (layer.route && layer.route.path) {
        const path = layer.route.path;
        // Check for malformed parameter (/: or /api/: etc)
        if (/\/:($|\/|\?|#)/.test(path)) {
          console.error(`Malformed route path detected: '${path}'`);
          process.exit(1);
        }
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        // Nested routers
        for (const nested of layer.handle.stack) {
          if (nested.route && nested.route.path) {
            const path = nested.route.path;
            if (/\/:($|\/|\?|#)/.test(path)) {
              console.error(`Malformed nested route path detected: '${path}'`);
              process.exit(1);
            }
          }
        }
      }
    }
  }
}

// ======= Register routes & Start Server =======
(async () => {
  try {
    await connectDB(); // Connect to the database
    const server = createServer(app);

    // Register all API routes
    app.use(router);

    printRoutePaths(router);
    validateRoutePaths(router);
    // ==========================================================

    // Defensive: Catch-all error handler for malformed route registration
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err && err.message && err.message.includes('Missing parameter name')) {
        console.error('Malformed route detected:', err);
        res.status(500).json({ message: 'Server misconfiguration: Malformed route detected.', error: err.message });
      } else {
        next(err);
      }
    });

    // Health check route for backend status
    app.get("/", (_req, res) => {
      res.send(" Backend is working!");
    });

    // ================= SPA Fallback Route =================
    // This wildcard route ensures that all non-API, non-static requests
    // are served the React app's index.html, enabling client-side routing.
    // It must be placed after all API and static routes.
    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(clientBuildPath, "index.html"));
    // });
    // ======================================================

    // Start the HTTP server
    server.listen(Number(PORT), '0.0.0.0', () => {
      console.log("===================================");
      console.log(` Server running at http://localhost:${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV}`);
      console.log("===================================");
    });

  } catch (error) {
    console.error(" Server failed to start:", error);
    process.exit(1);
  }
})();
