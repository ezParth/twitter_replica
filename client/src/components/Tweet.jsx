import React from "react";
import Avatar from "react-avatar";
import pic from "../assets/pic.png";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

function Tweet() {
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar src={pic} size="40" round={true} />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">Parth</h1>
              <p className="text-gray-500 text-sm ml-1">@ezParth .1m</p>
            </div>
            <div>
              <p>Hello world! This is a twitter clone!</p>
            </div>
            <div className="flex justify-between my-2">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 cursor-pointer rounded-full">
                  <FaRegComment size={20} />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-pink-200 cursor-pointer rounded-full">
                  <CiHeart size={24} />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 cursor-pointer rounded-full">
                  <CiBookmark size={24} />
                </div>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
