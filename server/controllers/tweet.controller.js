const Tweet = require("../models/tweetSchema")

const createTweet = async(req, res) => {
    try {
        const {description, id} = req.body;
        if(!description || !id){
            return res.status(401).json({
                message: "Fields are required!",
                success: false,
            })
        }
        await Tweet.create({
            description,
            userId: id// where the id is coming from
        });
        return res.status(401).json({
            message: "Tweet created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteTweet = async(req, res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted Successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

const likeOrDislike = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            //dislike
            await Tweet.findByIdAndUpdate(tweetId, {$pull:{like: loggedInUserId}})
            return res.status(200).json({
                message: "User disliked your tweet",
                success: true,
            })
        }else {
            //like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like: loggedInUserId}})
            return res.status(200).json({
                message: "User liked your tweet",
                success: true,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllTweet = async (req,res) => {
    //loggedInUser and followedUser tweets
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId: id});
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUsersId) => {
            return Tweet.find({userId: otherUsersId})
        }))
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUserTweets)
        })
    } catch (error) {
        console.log(error);
    }
}

const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id)
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUsersId) => {
            return Tweet.find({userId: otherUsersId});
        }))
    } catch (error) {
        console.log(error);
    }
}



module.exports = {createTweet, deleteTweet, likeOrDislike, getAllTweet, getFollowingTweets}