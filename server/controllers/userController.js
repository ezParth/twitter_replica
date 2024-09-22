const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config({
    path:"../config/.env"
})

const Register = async (req, res) => {
    try {
        const {name, username, email, password} = req.body;
        if(!name || !username || !emamil || !password ){
            return res.status(401).json({
                message: "Please enter all the details",
                success: false
            })
        }
        const user = await User.findOne(email);
        if(user){
            return res.status(401).json({
                messgae: "User already exists! pls login",
                success: false
            })
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
        })
    } catch (error) {
        console.log("**Error during register**",error)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if( !emamil || !password ){
            return res.status(401).json({
                message: "Please Enter all fields",
                success: true,
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "User doesn't exists",
                success: false,
            })
        }
        const isPassword = bcryptjs.compareSync(password, user.password);
        if(!isPassword){
            return res.status(401).json({
                messgae: "Incorrect email or password",
                success: false,
            })
        }
        const token = await jwt.sign(user._id, process.env.SECRET, {expiresIn:"1d"})
        return res.status(201).cookie("token", token, {expiresIn:"1d", httpOnly:true}).json({
            message: `Welcome back ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log("**error during login**", error)
    }    
}

const logout = (req, res) => {
    return res.cookie("token", "", {expiresIn: new Date(Dtae.now())}).json({
        messgae: "User logged out successfully!",
        success: true,
    })

}

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
        const id = req.params.id;
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