exports.getHome = (req, res) => {
  res.render("home");
};

exports.getUploadFiles = (req, res) => {
  res.render("homepage");
};

exports.postUploadFiles = (req, res) => {
  // console.log("upload files:", req.file); //if upload single file
  // console.log("upload files:", req.files); //if upload multiple files
  // console.log("images files:", req.files['profileImage'][0]); 
  // console.log("pdf files:", req.files['detailPdf'][0]); 
  res.json({images_files: req.files['profileImage'][0],pdf_files: req.files['detailPdf'][0] });
};
