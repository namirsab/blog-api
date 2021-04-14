const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Comments = require("./models/comment");
const Posts = require("./models/post");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - Enable CORS requests
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html
*/
app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200);
      res.json(posts);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

app.post("/posts", (req, res) => {
  Posts.create(req.body).then((newPost) => {
    res.status(201);
    res.json(newPost);
  });
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  Posts.findById(id).then((post) => {
    if (post) {
      res.status(200);
      res.json(post);
    } else {
      res.status(404);
      res.json({
        error: `Post with id: ${id} not found`,
      });
    }
  });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  Posts.findByIdAndUpdate(id, req.body, { new: true }).then((updatedPost) => {
    if (updatedPost) {
      res.status(200);
      res.json(updatedPost);
    } else {
      res.status(404);
      res.json({
        error: `Post with id: ${id} not found`,
      });
    }
  });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  Posts.deleteOne({ _id: id })
    .then(() => {
      res.status(204);
      res.json();
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: "Internal server error",
      });
    });
});

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  Comments.find({ postId: id }).then((comments) => {
    res.status(200);
    res.json(comments);
  });
});

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  Comments.create({ text, postId: id })
    .then((newComment) => {
      res.status(201);
      res.json(newComment);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});

const mongoConnectionString = "mongodb://127.0.0.1:27017/blogs";

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  /*
    We have to start the server. We make it listen on the port 4000
  */
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
