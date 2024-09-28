const express = require('express')
const databaseConnect = require("./config/Database")
const app = express()
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route")
const tweetRoute = require("./routes/tweet.route")
const cors = require("cors")

//environment variables
dotenv.config({
    path:".env"
})

//database
databaseConnect();

//middleware
app.use(express.urlencoded({extended: true}))//this helps to convert Url-encoded/percent-encoded data to convert into back to string, for example when a form is send it usually gets covnerted into a url-ecoded form and then when the server recieves the data it converts it back to string (from->url-encoded->over the network it get converted->binary->converts binary-> parses url-encoded data-> string)
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
   origin: ["http://localhost:5173", "http://localhost:3000"],
   credentials: true
}
app.use(cors(corsOptions))

//api
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoute)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))