import React from "react";
import biden from "../assets/biden.jpg";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import pic from "../assets/profile_pic.png";
import { useSelector } from "react-redux";
import useGetprofile from "../Hooks/useGetProfile";

function Profile() {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  
  // Fetch profile based on the URL id
  useGetprofile(id);

  console.log("I am this id : ", id);
  console.log("This is profile in Profile.jsx", profile);

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div className="aspect-[3/1]">
        <div className="flex items-center py-2">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>
        <img src={biden} alt="banner-pic" className="w-full h-full object-cover" />
        <div className="relative -top-16 -right-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              border: "4px solid white",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <Avatar src={pic} size="114px" round={true} />
          </div>
          <div className="absolute bottom-0 right-0 mb-4 mr-4 top-20">
            <button className="outline-none px-4 py-2 text-xl text-black border border-gray-200 rounded-full font-bold hover:bg-gray-200">
              Edit Profile
            </button>
          </div>
          <div className="m-4">
            <h1 className="font-bold text-2xl">{profile?.name}</h1>
            <p>{profile?.username.charAt(0) === '@' ? `${profile?.username}` : `@${profile?.username}`}</p>
          </div>
          <div className="m-4 text-sm">
            <p>👨‍💻 Passionate Software Developer | 🚀 Building the Future with Code | 💡 Innovator & Problem Solver | 🌐 Web Dev Enthusiast | 📚 Lifelong Learner | 🌟 Sharing Tips & Tricks | 💬 Let’s Connect!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
