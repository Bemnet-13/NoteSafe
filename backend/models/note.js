import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  importance: Number,
  due: Number,
  isCompleted: Boolean,
  userId: String,
});

const Note = new mongoose.model("notes", noteSchema);

export default Note;
