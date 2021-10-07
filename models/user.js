const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 50 },
  passwordHash: { type: String, required: true },
  messages: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", UserSchema);
