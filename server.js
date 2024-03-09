const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data store for users (replace this with a database in a real application)
let users = [];

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id?", (req, res) => {
  const { id } = req.params;
  if (id) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  }
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users[index] = { ...users[index], ...updatedUser };
  res.json(users[index]);
});

// DELETE /users/:id - Delete an existing user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
