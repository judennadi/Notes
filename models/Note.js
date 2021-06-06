const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title must not be blank"],
    },

    details: {
      type: String,
      required: [true, "Note must not be blank"],
    },
    image: {
      type: String,
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
