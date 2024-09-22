import React from "react";
import X_logo from "../assets/X_logo.png";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import {IoIosNotificationsOutline} from "react-icons/io"
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import {AiOutlineLogout} from "react-icons/ai"
import { Link } from "react-router-dom";

function LeftSidebar() {
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img className="ml-5" width={"24px"} src={X_logo} alt="X-logo" />
        </div>
        <div className="my-4">
          <Link to="/" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiHome size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiHashtag size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoIosNotificationsOutline size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Notification</h1>
          </div>
          <Link to="/profile" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmark</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <AiOutlineLogout size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 bottom-none font-medium bg-[#109BF0] w-full rounded-full">Post</button>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
