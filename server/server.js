import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/health.js";
import twitchRoutes from "./routes/twitch.js";
import gamesRoutes from "./routes/games.js";
import videosRoutes from "./routes/videos.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


// -------------------------
// CORS
// -------------------------

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://pulseplay.online",
  "https://www.pulseplay.online",
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS:", origin);

      return callback(null, false);
    },
    credentials: true,
  })
);


app.use(express.json());


// -------------------------
// ROUTES
// -------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PulsePlay API is running 🚀",
  });
});


app.use("/api/health", healthRoutes);

app.use("/api/twitch", twitchRoutes);

app.use("/api/games", gamesRoutes);

app.use("/api/videos", videosRoutes);


// -------------------------
// 404
// -------------------------

app.use((req, res) => {
  res.status(404).json({
    success:false,
    message:"Route not found",
  });
});


// -------------------------
// ERROR HANDLER
// -------------------------

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success:false,
    message:"Server error",
  });

});


// -------------------------
// START
// -------------------------

app.listen(PORT, () => {

  console.log(
    `PulsePlay API running on port ${PORT}`
  );

});