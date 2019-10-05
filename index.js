// implement your API here

const express = require("express");
const server = express();
const Users = require("./data/db.js");

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const {name, bio} = req.body;
  try {
    if (name && bio) {
      const data = await Users.insert({ name, bio });
      return res.status(201).json(data);
    }
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } catch (err) {
    return res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const data = await Users.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "The users information could not be retrieved."
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const {id} = req.params;
  try {
    if (id) {
      const data = await Users.findById(id);
      return res.status(200).json(data);
    }
    return res.status(404).json({
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      error: "The user information could not be retrieved."
    });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const {id} = req.params;
  try {
    if (id) {
      await Users.remove(id);
      return res.status(200).json({
        message: "Deleted"
      });
    }
    return res.status(404).json({
      message: "The user with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      error: "The user could not be removed"
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const {name, bio} = req.body;
  const {id} = req.params;
  try{
    if(!id){
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    if(!name || !bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    const data = await Users.update(id , {name, bio})
    return res.status(200).json(data)
  }
catch(err){
    return res.status(500).json({
        error: "The user information could not be modified."
    })
}
});

server.listen(3000, () => {
  console.log("listening on 3000");
});

// use cors

// create react app
