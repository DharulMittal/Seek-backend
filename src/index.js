import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import msg from "./routes/msg.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import passport from "./config/passport.js";

dotenv.config();

const initializeServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());   

    app.use(cors({
      origin: process.env.ORIGIN,
      credentials: true
    }));

    // Initialize Passport after MongoDB connection
    app.use(passport.initialize());

    const port = process.env.PORT

    app.use("/api/auth", auth);
    app.use("/api/msg", msg);

    app.get('/', (req, res) => {
      res.send('Hello World!')
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

initializeServer();