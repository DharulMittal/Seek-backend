import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
import msg from "./routes/msg.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());   

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

const port = process.env.PORT

app.use("/api/auth", auth);
app.use("/api/msg", msg);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB();
})