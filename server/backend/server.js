const express = require("express");
const connectDB = require("./config/db");
const pasteRoutes = require("./routes/pasteRoutes");

const dotenv = require("dotenv");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

//testing
app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.use("/api/snippets", pasteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
