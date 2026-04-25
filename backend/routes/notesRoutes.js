const express = require("express");
const router = express.Router();
const {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getNotes);
router.post("/add", authMiddleware, addNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
