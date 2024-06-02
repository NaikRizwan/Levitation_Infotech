import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { generateColoredLetters } from "./Nav";

const Change = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.newpassword.length < 6) {
      newErrors.newpassword = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://levitation-infotech.vercel.app/changepassword",
          formData
        );

        if (response.status === 200) {
          setSuccess(response.data.message);
          navigate("/login");
        } else {
          setError("Failed");
        }
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;

          if (status === 400) {
            setError(data.error);
          } else if (status === 401) {
            setError(data.error);
          } else if (status === 500) {
            setError(data.error);
          }
        } else {
          setError("Network error occurred");
        }
      } finally {
        setLoading(false);
      }
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
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 text-center my-8 mt-20">
        <h4 className="text-2xl font-bold mb-4 animate-bounce">
          {generateColoredLetters()}
        </h4>
        <h3 className="text-xl font-mono font-bold mb-2">Change Password</h3>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-700 text-sm" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label
              className="block mb-2 text-gray-700 text-sm"
              htmlFor="password"
            >
              Old Password:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block mb-2 text-gray-700 text-sm"
              htmlFor="newpassword"
            >
              New Password:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              id="newpassword"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              required
            />
            {errors.newpassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newpassword}</p>
            )}
          </div>
          {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loader border-4 border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Go Back To Login Page?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Sign In
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
            onClick={() => navigate("/login")}
          >
            &nbsp; Sign In &nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Change;
