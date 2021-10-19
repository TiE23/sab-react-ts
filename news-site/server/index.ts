import express from "express";
import cors from "cors";

import { Post } from "../shared/types";

const categories = require("./categories.json");
const posts = require("./posts.json");
const comments = require("./comments.json");
const app = express();

/**
 * We use the cors package to make sure that we can send requests from a different
 * localhost port to the server. Also, we use body-parser to more conveniently parse
 * data from the body of the request in the future.
 */
app.use(cors());
app.use(express.json());

const port = 4000;


// API Endpoints
app.get("/posts", (_, res) => {
  return res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const wantedId = String(req.params.id);
  const post = posts.find(({ id }: Post) => String(id) === wantedId)
  return res.json(post);
});

app.get("/categories", (_, res) => {
  return res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const found = posts.filter(({ category }: Post) => category === id);
  const categoryPosts = [...found, ...found, ...found];
  return res.json(categoryPosts);
});

app.get("/comments/:post", (req, res) => {
  const postId = Number(req.params.post);
  const found = comments.filter(({ post }) => post === postId);
  return res.json(found);
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = Number(req.params.id);
  comments.push({
    id: comments.length + 1,
    author: req.body.name,
    content: req.body.comment,
    post: postId,
    time: "Less than a minute ago",
  });
  // return res.json(comments.filter(({ post }) => post === postId));
  const responseJson = res.json(comments.filter(({ post }) => post === postId));
  console.log(responseJson);
  return responseJson;
});

// Start listening...
app.listen(port, () => {
  console.log(`DB is running on http://localhost:${port}!`);
});
