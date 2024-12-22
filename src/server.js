import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT

app.use("/api/auth",auth);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDB();
})