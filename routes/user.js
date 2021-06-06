const router = require("express").Router();
const auth = require("../middleware/auth");
const { edit_user } = require("../controllers/user");

router.patch("/:id", auth, edit_user);

module.exports = router;
