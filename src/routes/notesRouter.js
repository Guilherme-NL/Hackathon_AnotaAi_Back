import { Router } from "express";
import {
  AddNote,
  ListNotes,
  DeleteNote,
  EditNote,
  GetNote,
} from "../controllers/notesControllers.js";

const router = Router();

router.post("/notes", AddNote);
router.get("/notes", ListNotes);
router.get("/notes/:id", GetNote);
router.put("/notes/:id", EditNote);
router.delete("/notes/:id", DeleteNote);

export default router;
