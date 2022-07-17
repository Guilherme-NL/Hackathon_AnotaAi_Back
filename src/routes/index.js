import express from 'express';
import authRouter from "./authRouter/authRouter.js";
//import notesRouter from "./notesRouter/notesRouter.js";

const router = express.Router();
router.use(authRouter);
//router.use(notesRouter);
export default router;