// implement your API here

const express = require("express");
const server = express();
const Users = require("./data/db.js");

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    if (name && bio) {
      const data = await Users.insert({ name, bio });
      return res.status(201).json(data);
    } else {
      return res.status(400).json({
        errorMessage: "Please provide name and bio for the user."
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

server.get("/api/users", (req, res) => {
    
});

server.get("/api/users/:id", (req, res) => {});

server.delete("/api/users/:id", (req, res) => {});

server.put("/api/users/:id", (req, res) => {});

server.listen(3000, () => {
  console.log("listening on 3000");
});

// use cors

// create react app
