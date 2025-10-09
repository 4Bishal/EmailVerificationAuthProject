import express from "express"
import http from "http"
import dotenv from "dotenv"
import { connectDb } from "./db/connectDb.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config();

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000 || 8080 || 9090;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

server.listen(PORT, async () => {
    await connectDb();
    console.log(`App is listening at port ${PORT}`);
})