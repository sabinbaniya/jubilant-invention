const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi, I'm working");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connectDB(process.env.MONGO_URI || "");
  console.log("Connected to DB & listening on port 5000");
});
