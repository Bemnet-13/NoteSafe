import express from "express";
import * as noteController from "../controllers/noteController.js";
const noteRouter = express.Router();

// Note CRUD routes

noteRouter.get("/notes/all/:userId", noteController.getAllNotes);

noteRouter.post("/notes/new/:userId", noteController.createNewNote);

noteRouter.patch(
  "/notes/:noteId/users/:userId",
  noteController.setCompletionStatus
);

noteRouter.delete("/notes/:noteId/users/:userId", noteController.deleteNote);

// Filtering routes
noteRouter.get("/notes/:userId", noteController.filterNotes);

export default noteRouter;
