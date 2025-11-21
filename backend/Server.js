const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/DBconnect");
const doctorRoutes = require("./routes/doctorRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectdb();

app.get("/", (req, res) => {
  res.send("Server bdiya chl rha hai");
});

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

