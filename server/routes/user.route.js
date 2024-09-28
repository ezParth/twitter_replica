const express = require("express");
const { Register, login, logout, bookmarks, getMyProfile, getOtherUsers, follow, unfollow } = require("../controllers/userController");
const router = express.Router();
const isAuthenticated = require("../config/auth")

router.route("/register").post(Register);
router.route("/login").post(login)
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmarks);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otherUsers/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").get(isAuthenticated, follow);
router.route("/unfollow/:id").get(isAuthenticated, unfollow);

module.exports = router;