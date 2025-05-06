const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("./model");
const app = express();

app.use(express.urlencoded({ extended: false })); //body parser middleware

app.get("/users", async (req, res) => {
  const data = await User.find();
  const html = `
    <ul>
      ${data
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
app.get("/api/users", async (req, res) => {
  try {
    let data = await User.find(); // fetch all users from DB
    return res.json(data); // no need for JSON.stringify
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const Id = req.params.id;
  const user = await User.findById(Id);
  if (!user) {
    return res.status(404).json({ msg: "User not found in this id " });
  } else {
    return res.json(user);
  }
});

app.post("/api/users", (req, res) => {
  // console.log(req.body, req.url);
  const user = new User(req.body);
  user.save().then(() => {
    return res.status(201).json({ status: "Post Successful" ,user});
  });
});

// app.patch("/api/users/:id", async(req, res) => {
//   const id = req.params.id;
//   const updates = req.body;

//   // Find user by ID
//   const user =await User.findById(id);
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }
//   // Update only provided fields
//   Object.assign(user, updates);
//   await user.save()
//   console.log("Updated user:", user);
//     return res.json({ message: "User updated", user });
// });

app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // return the updated document
      runValidators: true, // ensure validation rules are applied
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log("Updated user:", updatedUser);
    return res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const id = (req.params.id);
  console.log(req.url, req.params);

  const userToDelete = await User.findByIdAndDelete(id);
  // console.log("userToDelete:", userToDelete);
  if (!userToDelete) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({
    status: "User deleted successfully",
    deleted: userToDelete,
  });
});

//.................................................................................................//

app.use("/", (req, res) => {
  return res.json({ msg: "This is Home Page" });
});

const db_path =
  "mongodb+srv://sagargautam389:sagargautam389@usercluster.tmvdaad.mongodb.net/userdetail?retryWrites=true&w=majority&appName=userCluster";
const PORT = 3001;

mongoose
  .connect(db_path)
  .then(() => {
    console.log("Database Started............");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error occur while database connection:", err);
  });
