import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const handelRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/login",
        {
          
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log(data);
      toast.success(data.message || "User LoggedIn successfully");
      localStorage.setItem("jwt", data.user.token)
      navigateTo("/")
      setEmail("")
      setPassword("")
      

    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.errors || "failed to login");
    }
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form onSubmit={handelRegister}>
            
            
            {/* email */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="text"
                placeholder="Enter email"
              />
            </div>
            {/* password */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="mt-3 text-white rounded-lg w-full p-3 bg-blue-700 hover:bg-blue-900 duration-300 font-semibold"
            >
              Login
            </button>
            <p className="text-gray-500 text-center mt-3">
              Don't have account ?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
