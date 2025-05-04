const express = require('express');
const app = express();

app.use(express.json()); // For parsing JSON bodies

// Dummy in-memory data
let users = [{ id: 1, name: "Sagar" }];



// GET – Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST – Add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT – Replace a user by ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map(user => user.id === id ? req.body : user);
  res.json({ message: 'User replaced' });
});

// PATCH – Update part of a user by ID
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.map(user => user.id === id ? { ...user, ...req.body } : user);
  res.json({ message: 'User updated' });
});

// DELETE – Remove a user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: 'User deleted' });
});

app.use('/',(req,res,next)=>{
  res.send('This is Home Page')
  })


// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
