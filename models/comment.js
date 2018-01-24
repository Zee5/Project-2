const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //this is good use case for refs
    },
    username: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
