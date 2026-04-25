const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
      createdBy: req.user.id,
    });

    await newNote.save();

    res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("createdBy", "name email");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const existingNote = await Note.findById(req.params.id);

    if (!existingNote)
      return res.status(404).json({ message: "Note not found" });

    if (existingNote.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const existingNote = await Note.findById(req.params.id);

    if (!existingNote)
      return res.status(404).json({ message: "Note not found" });

    if (existingNote.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await existingNote.deleteOne();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
