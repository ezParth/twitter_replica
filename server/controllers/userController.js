const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config({
    path:"../config/.env"
})

const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name) {
            return res.status(401).json({
                message: "Please enter your name",
                success: false
            });
        }
        if (!username) {
            return res.status(401).json({
                message: "Please enter your username",
                success: false
            });
        }
        if (!email) {
            return res.status(401).json({
                message: "Please enter your email",
                success: false
            });
        }
        if (!password) {
            return res.status(401).json({
                message: "Please enter your password",
                success: false
            });
        }
                                
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists! Please login",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        });
    } catch (error) {
        console.log("**Error during register**", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Please enter all fields",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User doesn't exist",
                success: false,
            });
        }
        const isPassword = bcryptjs.compareSync(password, user.password);
        if (!isPassword) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const token = await jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        });
    } catch (error) {
        console.log("**Error during login**", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const logout = (req, res) => {
    return res.cookie("token", "", { maxAge: 0 }).json({
        message: "User logged out successfully!",
        success: true,
    });
};

const bookmarks = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if(user.bookmarks.includes(loggedInUserId)){
            //unsave
            await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmarks: tweetId}})
            return res.status(200).json({
                message: "Tweet removed from bookmarked tweets",
                success: true,
            })
        }else {
            //save
            await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmarks: tweetId}})
            return res.status(200).json({
                message: "tweet added to bookmarked tweet",
                success: true,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getMyProfile = async(req, res) => {
    try {
        const id = req.user;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
}

const getOtherUsers= async(req, res) => {
    try {
        const {id} = req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
        if(!otherUsers){
            return res.status(401).json({
                message: "Currently we don't have any user",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Users retrived successfully!",
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}

const follow = async(req, res) => {
    try {
       const loggedInUserId = req.body.id;// me
       const userId = req.params.id;// other guy
       const loggedInUser = await User.findById(loggedInUserId);
       const user = await User.findById(userId);
       if(!user.followers.includes(loggedInUserId)) {
        await user.updateOne({$push:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$push:{following: userId}})
       }else{
        return res.status(400).json({
            message: "Already following the user"
        })
       }
       return res.status(200).json({
        message:`${loggedInUser.name} recently followed ${user.name}`,
        success: true,
       })
    } catch (error) {
        console.log(error);
    }
}

const unfollow = async(req, res) => {
    const loggedInUserId = req.body.id;// me
       const userId = req.params.id;// other guy
       const loggedInUser = await User.findById(loggedInUserId);
       const user = await User.findById(userId);
       if(!loggedInUser.following.includes(userId)) {
        await user.updateOne({$pull:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$pull:{following: userId}})
       }else{
        return res.status(400).json({
            message: "unfollowed!"
        })
       }
       return res.status(200).json({
        message:`${loggedInUser.name} recently unFollowed ${user.name}`,
        success: true,
       })
}

module.exports = { Register, login, logout , bookmarks, getMyProfile, getOtherUsers, follow, unfollow}