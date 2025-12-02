const doctor = require("../models/Doctor");


exports.adddoctors = async (req, res) => {
  try {
    const { name, Time } = req.body;

    const newdoctor = new doctor({
      name,
      Time,
      createdBy: req.user.id,
    });

    await newdoctor.save();

    res.status(201).json({
      message: "Notes added successfully",
      doctor: newdoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getdoctors = async (req, res) => {
  try {
    const doctors = await doctor.find().populate("createdBy", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updatedoctors = async (req, res) => {
  try {
    const existingdoctor = await doctor.findById(req.params.id);

    if (!existingdoctor)
      return res.status(404).json({ message: "doctor not found" });

  
    if (existingdoctor.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletedoctors = async (req, res) => {
  try {
    const existingdoctor = await doctor.findById(req.params.id);

    if (!existingdoctor)
      return res.status(404).json({ message: "Notes not found" });


    if (existingdoctor.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await existingdoctor.deleteOne();

    res.json({ message: "Notes deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
