const express = require("express");
const fs = require("fs");
let users = require("./MOCK_DATA.json");

const app = express();

app.use(express.urlencoded({ extended: false })); //body parser middleware

app.get("/users", (req, res) => {
  console.log(req.url, req.body);

  const html = `
    <ul>
      ${users
        .map(
          (user) => `
        <li>
          <p><strong>User Details:</strong></p>
          <ul>
            <li>First Name: ${user.first_name}</li>
            <li>Last Name: ${user.last_name}</li>
            <li>Email: ${user.email}</li>
            <li>Job Title: ${user.job_title}</li>
          </ul>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  return res.send(html);
});

//Rest Api.....................................................................................//
app.get("/api/users", (req, res) => {
  console.log(req.url, req.body);
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const Id = Number(req.params.id);
  console.log(req.url, req.params);
  const user = users.find((item) => item.id === Id);
  if (!user) {
    return res.status(404).json({ msg: "User not found in this id " });
  } else {
    return res.json(user);
  }
});

app.post("/api/users", (req, res) => {
  console.log(req.body, req.url);
  users.push({ id: users.length + 1, ...req.body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) console.log("error occur:", err);
    else
      return res
        .status(201)
        .json({ status: "Post Successful", id: users.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  // Find user by ID
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // Update only provided fields
  Object.assign(user, updates);
  console.log("Updated user:", user);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
    return res.json({ message: "User updated", user });
  });
});

// app.delete("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log(req.url, req.params);

//   // Find the user
//   const userIndex = users.findIndex(u => u.id === id);
//   if (userIndex === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }
//   // Remove user from the array
//   const deletedUser = users.splice(userIndex, 1)[0];
//   return res.json({
//     status: "User deleted successfully",
//     deleted: deletedUser
//   });
// });

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(req.url, req.params);

  const userToDelete = users.find((u) => u.id === id);
  console.log("userToDelete:", userToDelete);
  if (!userToDelete) {
    return res.status(404).json({ error: "User not found" });
  }
  // Create a new array excluding the user with the matching ID
  users = users.filter((u) => u.id !== id);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
    return res.json({
      status: "User deleted successfully",
      deleted: userToDelete,
    });
  });
});

//.................................................................................................//

app.use("/", (req, res) => {
  return res.json({ msg: "This is Home Page" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
