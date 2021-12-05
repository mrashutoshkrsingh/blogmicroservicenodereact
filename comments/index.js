const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  commentsByPostId[req.params.id] = (
    commentsByPostId[req.params.id] || []
  ).concat({
    content,
    id: commentId,
  });
  res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(4001, () => {
  console.log("server is running on port 4001");
});
