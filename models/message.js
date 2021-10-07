const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, maxlength: 150 },
  },
  {
    timestamps: true,
  }
);

MessageSchema.virtual("sent_at").get(function () {
  return this.created_at.toDateString();
});

module.exports = mongoose.model("Message", MessageSchema);
