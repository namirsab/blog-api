const express = require("express");
const db = require("./lib/db");

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

/*
  Endpoint to handle GET requests to the root URI "/"
*/
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

/*
  We have to start the server. We make it listen on the port 4000

*/
app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
