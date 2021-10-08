const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, maxlength: 150 },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

MessageSchema.virtual("sent_at").get(function () {
  return this.createdAt.toDateString();
});

module.exports = mongoose.model("Message", MessageSchema);
