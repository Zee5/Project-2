const mongoose = require("mongoose");
// Schema setup
const placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
    comments: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment" //I would probably embed comments as a sub-document since they won't make sense out of context
      }
    ]
});
// compile the schema in to a model
module.exports = mongoose.model("Place", placeSchema);
