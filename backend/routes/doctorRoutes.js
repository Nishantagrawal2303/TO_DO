const express = require("express");
const router = express.Router();
const {
  adddoctors,
  getdoctors,
  updatedoctors,
  deletedoctors,
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getdoctors);

router.post("/add", authMiddleware, adddoctors);
router.put("/:id", authMiddleware, updatedoctors);
router.delete("/:id", authMiddleware, deletedoctors);

module.exports = router;
