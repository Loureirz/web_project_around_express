const { Router } = require("express");
const { listUsers, getUserById, createUser, updateProfile, updateAvatar } = require("../controllers/users");
const router = new Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;