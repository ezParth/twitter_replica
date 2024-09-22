import React, { useState } from "react";
import logo from "../assets/X_logo.png";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const loginSignupHandler = () => {
    setIsLogin(!isLogin)
  }

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
          <h1 className="mt-4 mb-2 my-4 text-4xl font-bold">{isLogin?"login":"Signup"}</h1>
          <form className="flex flex-col w-[50%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="text"
              placeholder="Name"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="text"
              placeholder="Username"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className="bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white">
              {isLogin?"Loign":"Create Account"}
            </button>
            <h1>{isLogin?"doesn't have an account? ":"Already have account? "} <span onClick={loginSignupHandler} className="cursor-pointer font-bold text-blue-600">{isLogin?"Signup":"Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
