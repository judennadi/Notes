const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title must not be blank"],
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: [true, "note must not be blank"],
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
