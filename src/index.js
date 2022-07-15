import express, { json } from "express";
import cors from "cors";
import notesRouter from "./routes/notesRouter.js";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.use(notesRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server On!"));
