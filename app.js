const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");

const allowedOrigins = [
  "http://127.0.0.1:8000/",
  "http://localhost:8000/"
]

app.use(cors());
app.use(bodyParser.json()); // Middleware untuk parsing JSON

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
