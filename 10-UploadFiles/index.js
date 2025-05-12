const path = require("path");
const express = require("express");
const multer = require("multer");
const uploadRouter = require("./routes/upload_router");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
// ....................................................................
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('destination file:',file);
    if (file.fieldname === "profileImage") {
      cb(null, "./uploads/images");
    } else if (file.fieldname === "detailPdf") {
      cb(null, "./uploads/pdf_files");
    }
  },
  filename: (req, file, cb) => {
    // console.log('filename file:',file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
//..................................................................................
// app.use(upload.single("profileImage"), uploadRouter); //for single file
app.use(
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "detailPdf", maxCount: 1 },
  ]),
  uploadRouter
); //for multiple file uploads

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
