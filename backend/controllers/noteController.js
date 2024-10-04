import Note from "../models/note.js";

const createNewNote = async (req, res) => {
  if (req.isAuthenticated()) {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      importance: req.body.importance,
      due: req.body.due,
      isCompleted: false,
      userId: req.params.userId,
    });
    await newNote.save().then(() => {
      res.status(201).json({ msg: "New Note saved" });
    });
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
};

const getAllNotes = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const notes = await Note.find({ userId: req.params.userId });
      res.json(notes);
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "Could not find notes" });
    }
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
};

const setCompletionStatus = async (req, res) => {
  // Set the completion status
  if (req.isAuthenticated()) {
    try {
      const note = await Note.findById(req.params.noteId);
      note.isCompleted = !note.isCompleted;
      await note.save().then(() => {
        res.status(204).json(note);
      });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ msg: "Could not update the note with the given Id." });
    }
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
};

const deleteNote = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const note = await Note.findByIdAndDelete(req.params.noteId);
      res.json(note);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ msg: "Could not delete the note with the given Id." });
    }
  } else {
    res.json({ msg: "Not authenticated" });
  }
};

const filterNotes = async (req, res) => {
  if (req.isAuthenticated()) {
    const { filterBy } = req.query;
    if (filterBy === "importance") {
      Note.find({ userId: req.params.userId })
        .sort({ importance: -1 }) // Sort by createdAt in descending order
        .then((filteredNotes) => {
          res.json(filteredNotes);
        })
        .catch((err) => {
          console.error("Error fetching documents:", err);
        });
    } else if (filterBy === "due") {
      Note.find({ userId: req.params.userId })
        .sort({ due: 1 })
        .then((filteredNotes) => {
          res.json(filteredNotes);
        })
        .catch((err) => {
          console.error("Error fetching documents : ", err);
        });
    }
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
};

export {
  createNewNote,
  getAllNotes,
  setCompletionStatus,
  deleteNote,
  filterNotes,
};
