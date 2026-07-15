import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// -------------------------
// CORS CONFIGURATION
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
      // Allow server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(express.json());


// -------------------------
// BASIC ROUTES
// -------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PulsePlay API is running 🚀",
  });
});


app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


// -------------------------
// TWITCH STATUS ROUTE
// -------------------------

app.get("/api/twitch/status", async (req, res) => {
  try {

    const channel =
      req.query.channel || "Veiltactician";


    // Temporary response
    // Replace with Twitch API later

    res.json({
      success: true,
      channel,
      live: false,
      title: null,
      viewers: 0,
    });


  } catch (error) {

    console.error(
      "Twitch status error:",
      error
    );

    res.status(500).json({
      success:false,
      error:"Unable to get Twitch status",
    });

  }
});


// -------------------------
// 404 HANDLER
// -------------------------

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found",
  });
});


// -------------------------
// ERROR HANDLER
// -------------------------

app.use((err, req, res, next)=>{

  console.error(err);

  res.status(500).json({
    success:false,
    message:"Server error",
  });

});


// -------------------------
// START SERVER
// -------------------------

app.listen(PORT, () => {

  console.log(
    `PulsePlay API running on port ${PORT}`
  );

});