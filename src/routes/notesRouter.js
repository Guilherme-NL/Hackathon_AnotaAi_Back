import { Router } from "express";
import {
  AddNote,
  ListNotes,
  DeleteNote,
  EditNote,
  GetNote,
} from "../controllers/notesController.js";

const router = Router();

router.post("/notes", AddNote);
router.get("/notes", ListNotes);
router.get("/notes/:id", GetNote);
router.update("/notes/:id", EditNote);
router.delete("/notes/:id", DeleteNote);

export default router;
