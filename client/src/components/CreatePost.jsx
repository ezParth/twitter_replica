import React from "react";
import Avatar from "react-avatar";
import profile_pic from "../assets/profile_pic.png";
import { CiImageOn } from "react-icons/ci";

function CreatePost() {
  return (
    <div className="w-[100%]">
      <div className="">
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-grey-600 text-lg">For You</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-grey-600 text-lg">Following</h1>
          </div>
        </div>
        <div className="">
          <div className="flex items-center p-4">
            <div>
              <Avatar src={profile_pic} size="40" round={true} />
            </div>
            <input
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
                <CiImageOn size="24px"/>
            </div>
            <button className="bg-[#109BF0] text-lg text-white text-right px-4 py-1 border-none rounded-full">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
