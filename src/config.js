const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://ammar:123@cluster0.a2lyw0f.mongodb.net/"
);

connect
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("user", loginSchema);

module.exports = collection;
