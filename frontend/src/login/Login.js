import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import React, { useState } from "react";
import { generateColoredLetters } from "./Nav";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [num1] = useState(Math.floor(Math.random() * 10)); // Generate random numbers
  const [num2] = useState(Math.floor(Math.random() * 10));
  const [captchaResult, setCaptchaResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSum = (e) => {
    e.preventDefault();
    const sum = num1 + num2;
    if (parseInt(captchaResult) === sum) {
      // CAPTCHA is correct, proceed with login
      handleSubmit(e);
    } else {
      setError("Wrong answer! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/log", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        const data = await res.json();
        dispatch({ type: "CLEAR_USER" });
        if (data && data.error) {
          setError(data.error);
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } else if (res.status === 200) {
        const data = await res.json();
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.userlogin.full_name,
            email: data.userlogin.email,
          },
        });
        setSuccess("Successfully logged in");
        navigate("/");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://d3nn873nee648n.cloudfront.net/900x600/3189/20-SM107059.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 text-center my-8 mt-20 ">
        <h4 className="text-2xl font-bold mb-4 animate-bounce">
          {generateColoredLetters()}
        </h4>
        <h3 className="text-xl font-mono font-bold mb-2">Login Here</h3>
        <form onSubmit={handleSum} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-700 text-sm" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label
              className="block mb-2 text-gray-700 text-sm"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label
              className="block mb-2 text-gray-700 text-sm font-bold"
              htmlFor="captcha"
            >
              Solve the SUM: {num1} + {num2} =
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="captcha"
              name="captcha"
              value={captchaResult}
              onChange={(e) => setCaptchaResult(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loader border-4 border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
            onClick={() => navigate("/forget")}
          >
            Forget Password
          </button>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
            onClick={() => navigate("/changepass")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
