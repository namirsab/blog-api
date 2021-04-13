const fs = require("fs/promises");
const path = require("path");

/*
  In node, paths depend on when the node command
  was executed. To be able to use a relative path
  here to the file db.json in the same folder,
  we need to use the path module to resolve the
  correct path.
  __dirname is a global variable from node that
  contains the folder of the current module
  path.resolve will return the correct path for us
*/
const dbPath = path.resolve(__dirname, "./db.json");

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
  return fs.readFile(dbPath, "utf-8").then((jsonData) => {
    const posts = JSON.parse(jsonData);
    const newPost = {
      ...post,
      id: `${posts.length + 1}`,
      createdAt: new Date().toISOString(),
      votes: {
        up: 0,
        down: 0,
      },
    };
    posts.push(newPost);
    fs.writeFile(dbPath, JSON.stringify(posts));
    return newPost;
  });
}

/*
  Find all the posts in the database

  returns an Promise containing an array of posts
  if fulfilled
*/
function findAll() {
  return fs.readFile(dbPath, "utf-8").then((jsonData) => {
    const posts = JSON.parse(jsonData);
    return posts;
  });
}

/*
  param id: string

  returns a Promise containing the found post
  if existing or undefined if no post with the
  given id exists if fullfilled
*/
function findById(id) {
  return fs.readFile(dbPath, "utf-8").then((jsonData) => {
    const posts = JSON.parse(jsonData);

    const post = posts.find((post) => {
      return post.id === id;
    });

    return post;
  });
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
  return fs.readFile(dbPath, "utf-8").then((jsonData) => {
    const posts = JSON.parse(jsonData);

    let newPost;
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        newPost = {
          ...post,
          ...content,
        };
        return newPost;
      } else {
        return post;
      }
    });

    if (newPost) {
      fs.writeFile(dbPath, JSON.stringify(newPosts));
    }

    return newPost;
  });
}

/*
  param id: string

  returns a a void Promise (contains no data).
  If the Promise is fullfilled, then the operation
  was successful. If the Promise is rejected,
  operation failed.
*/
function deleteById(id) {
  return fs.readFile(dbPath, "utf-8").then((jsonData) => {
    const posts = JSON.parse(jsonData);

    const newPosts = posts.filter((post) => {
      return post.id !== id;
    });

    return fs.writeFile(dbPath, JSON.stringify(newPosts));
  });
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
