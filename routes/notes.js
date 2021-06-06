const router = require("express").Router();
const auth = require("../middleware/auth");
const { create_post, notes_get, note_get, note_edit, note_delete } = require("../controllers/notes");

router.get("/", auth, notes_get);
router.post("/create", auth, create_post);
router.get("/:id", auth, note_get);
router.patch("/:id", auth, note_edit);
router.delete("/:id", auth, note_delete);

module.exports = router;
