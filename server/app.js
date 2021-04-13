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

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
