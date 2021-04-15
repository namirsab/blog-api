const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const Post = require("./models/post");

/*
  We create an express app calling
  the express function.
*/
const app = express();

/*
  We setup middleware to:
  - parse the body of the request to json for us
  https://expressjs.com/en/guide/using-middleware.html
*/
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);
  next();
});

/*
  Endpoint to handle GET requests to the root URI "/"
*/

app.get("/posts", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200);
      res.json(posts);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id).then((post) => {
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

  db.updateById(id, req.body).then((updatedPost) => {
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

  db.deleteById(id)
    .then(() => {
      res.status(200);
      res.json();
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: "Internal server error",
      });
    });
});

app.post("/posts", (req, res) => {
  Post.create(req.body).then((newPost) => {
    res.status(201);
    res.json(newPost);
  });
});

/*
  We have to start the server. We make it listen on the port 4000

*/

// localhost = 127.0.0.1
mongoose.connect("mongodb://localhost/blogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
