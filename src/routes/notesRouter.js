import { Router } from "express";
import { AddNote } from "../controllers/notesController.js";

const router = Router();

router.post("/notes", AddNote);
router.get("/notes", listNotes);
router.get("/notes/:id", getNote);
router.delete("/notes/:id", DeleteNote);

export default router;
