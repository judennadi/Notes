const Note = require("../models/Note");
const User = require("../models/User");

const create_post = async (req, res) => {
  const { title, details, image } = req.body;
  const { _id } = req.user;

  try {
    await Note.create({ title, details, image, creator: _id });

    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const notes_get = async (req, res) => {
  const user = req.user;
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json({ notes, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const note_get = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: "Couldn't get data" });
  }
};

const note_edit = async (req, res) => {
  const id = req.params.id;
  req;
  try {
    const user = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const note_delete = async (req, res) => {
  try {
    const notes = await Note.findByIdAndDelete(req.params.id);

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create_post, notes_get, note_get, note_edit, note_delete };
