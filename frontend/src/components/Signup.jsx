import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const handelRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt", data.token)
      navigateTo("/login")
      setEmail("")
      setPassword("")
      setUsername("")

    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.errors || "failed to register");
    }
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center">Signup</h2>
          <form onSubmit={handelRegister}>
            {/* username */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                type="text"
                placeholder="Enter username"
              />
            </div>
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
              Signup
            </button>
            <p className="text-gray-500 text-center mt-3">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
