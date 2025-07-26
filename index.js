const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ CORS Configuration
app.use(cors({
    origin: "https://frontend-varnabs-projects.vercel.app",  // ✅ Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],  
      credentials: true,    
}));

app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api", router);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ 
        success: false, 
        message: err.message || "Internal Server Error" 
    });
});

const PORT = process.env.PORT || 8080;

// ✅ Connect to Database & Start Server
connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`✅ Connected to DB`);
            console.log(`🚀 Server running on port ${PORT}`);
        });

        // ✅ Graceful Shutdown
        const shutdown = async () => {
            console.log("\n🛑 Shutting down server...");
            await server.close();
            console.log("🔌 Server closed.");
            process.exit(0);
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    })
    .catch(err => {
        console.error("❌ Failed to connect to DB:", err);
        process.exit(1);
    });
