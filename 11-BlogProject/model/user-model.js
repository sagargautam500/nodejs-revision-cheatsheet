const { createHash, randomBytes } = require("crypto"); //core module
const { default: mongoose } = require("mongoose"); //external module

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profileImageUrl: { type: String, default: "/images/defaultProfile.jpg" },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashPassword = createHash("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
