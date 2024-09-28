const express = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config({
    path:"../config/.env"
})

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User is not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET);
        req.user = decode.id;
        next();
    } catch (error) {
        console.log("error during authentication", error);
    }
}

module.exports = isAuthenticated