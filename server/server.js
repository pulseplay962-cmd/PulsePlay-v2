import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/health.js";
import twitchRouter from "./routes/twitch.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// API Routes
app.use("/api/health", healthRoutes);

app.use("/api/twitch", twitchRouter);


// Root test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PulsePlay API is running 🚀",
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 PulsePlay API running on http://localhost:${PORT}`
  );
});