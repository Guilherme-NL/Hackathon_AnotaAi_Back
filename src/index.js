import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server On!"));
