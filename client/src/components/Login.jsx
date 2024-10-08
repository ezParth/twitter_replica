import React, { useState } from "react";
import logo from "../assets/X_logo.png";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error){
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
        console.log(error);
      }
      setloading(false);
    } else {
      //signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
        console.log(error);
      }
      setloading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img className="ml-5" width={"300px"} src={logo} alt="twitter logo" />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-7xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 my-4 text-4xl font-bold">
            {isLogin ? "login" : "Signup"}
          </h1>
          <form className="flex flex-col w-[50%]" onSubmit={submitHandler}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className={`bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white ${loading ? "opacity-70 cursor-not-allowed": ''}`} disabled={loading}>
              {loading ? "Loading...":(isLogin ? "Login" : "Create Account")}
            </button>
            <h1>
              {isLogin ? "doesn't have an account? " : "Already have account? "}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-bold text-blue-600"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
