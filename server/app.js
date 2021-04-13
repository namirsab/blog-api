const express = require("express");
const db = require("./lib/db");

const app = express();

app.use(express.json());
app.use(express.query());

app.get("/", (req, res) => {
  res.json({
    "/posts": "read and create new posts",
    "/posts/:id": "read, update and delete an individual post",
  });
});

app.get("/posts", (req, res) => {
  db.findAll()
    .then((data) => {
      res.status(200);
      res.json(data);
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
      res.send({
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
      res.send({
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
      res.send();
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: "Internal server error",
      });
    });
});

app.post("/posts", (req, res) => {
  db.insert(req.body).then((newPost) => {
    res.status(201);
    res.json(newPost);
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
