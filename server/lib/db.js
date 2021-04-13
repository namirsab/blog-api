const Posts = require("../models/post");

/*
  Insert a post to the database
  param post: Object
  {
    title: string,
    body: string
  }

  For that reason, here we add:
  {
    id: string
    votes: Object {
      up: number,
      down: number
    },
    cretaedAt: string  //represents date
  }
  
  returns a Promise containing
  the new post if fullfilled
*/
function insert(post) {
  return Posts.create(post);
}

/*
  Find all the posts in the database

  returns an Promise containing an array of posts
  if fulfilled
*/
function findAll() {
  return Posts.find();
}

/*
  param id: string

  returns a Promise containing the found post
  if existing or undefined if no post with the
  given id exists if fullfilled
*/
function findById(id) {
  return Posts.findById(id);
}
/*
  param id: string
  param content: Object {
    title: string
    body: string,
  }

  returns a Promise containing the updated post
  if existing or undefined if no post with the
  given id exists if fullfilled
*/
function updateById(id, content) {
  return Posts.findByIdAndUpdate(id, content, { new: true });
}

/*
  param id: string

  returns a a void Promise (contains no data).
  If the Promise is fullfilled, then the operation
  was successful. If the Promise is rejected,
  operation failed.
*/
function deleteById(id) {
  return Posts.deleteOne({ _id: id });
}

/*
  This module exports the following functions
*/
exports.insert = insert;
exports.findAll = findAll;
exports.findById = findById;
exports.deleteById = deleteById;
exports.updateById = updateById;

/*
  Example Usage:
  const db = require('db');

  db.insert({ title: "A Title", body: "some content"})
    .then(newPost => {
      console.log(newPost);
    })
    .catch(error => {
      console.error(error);
    });
  
  db.findAll().then(posts => {
    console.log(posts);
  })

  db.findById("1").then(post => {
    if(post) {
      console.log("Post found")
    } else {
      console.log("Post not found")
    }
  });

  db.deleteById("1").then(() => {
    console.log('deleted successfully');
  })

  db.updateById("1", { body: "new content" }).then(updatedPost => {
    if (updatedPost) {
      // Post updated
    } else {
      // Post not found, hence couldn't be updated
    }
  });
*/
