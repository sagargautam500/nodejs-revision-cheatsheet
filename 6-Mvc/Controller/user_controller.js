const User = require("../Model/user_model");

exports.getHome=async(req,res)=>{
  return res.send(`<h1>This is Home Page</h1>`);
  
}

exports.getDetails=async(req,res)=>{
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
}

exports.getAllUser = async (req, res) => {
  try {
    let data = await User.find(); // fetch all users from DB
    return res.json(data); // no need for JSON.stringify
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSingleUser = async (req, res) => {
  const Id = req.params.id;
  const user = await User.findById(Id);
  if (!user) {
    return res.status(404).json({ msg: "User not found in this id " });
  } else {
    return res.json(user);
  }
};

exports.postUserData = async (req, res) => {
  // console.log(req.body, req.url);
  const user = new User(req.body);
  user.save().then(() => {
    return res.status(201).json({ status: "Post Successful", user });
  });
};

exports.patchUserData = async (req, res) => {
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
};

exports.deleteUserData = async (req, res) => {
  const id = req.params.id;
  // console.log(req.url, req.params);

  const userToDelete = await User.findByIdAndDelete(id);
  // console.log("userToDelete:", userToDelete);
  if (!userToDelete) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({
    status: "User deleted successfully",
    deleted: userToDelete,
  });
};
