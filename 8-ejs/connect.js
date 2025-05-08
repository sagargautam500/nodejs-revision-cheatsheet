const { mongoose } = require("mongoose");

const connectToMongoDb = async () => {
  db_uri =
    "mongodb+srv://sagargautam389:sagargautam389@usercluster.tmvdaad.mongodb.net/short_url?retryWrites=true&w=majority&appName=userCluster";
  return await mongoose.connect(db_uri);
};

module.exports = connectToMongoDb;
