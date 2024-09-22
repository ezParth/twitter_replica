const express = require("express");
const { createTweet, deleteTweet, likeOrDislike, getAllTweet, getFollowingTweets } = require("../controllers/tweet.controller");
const router = express.Router();
const isAuthenticated = require("../config/auth")

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike)
router.route("/alltweets/:id").put(isAuthenticated, getAllTweet)
router.route("/followingtweets/:id").put(isAuthenticated, getFollowingTweets)

module.exports = router;
