const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const pasteModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    password: {
      type: String,
      default: "default",
    },
    content: { type: String, trim: false },
    slug: String,
    language: { type: String, default: "text" },
  },
  {
    timestamps: true,
  }
);

pasteModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

pasteModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Paste = mongoose.model("Paste", pasteModel);
module.exports = Paste;
