import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { generateColoredLetters } from "./Nav";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const resetToken = window.location.pathname.split("/").pop(); // Extract reset token from URL

    try {
      setLoading(true);
      // Send a POST request to your backend to update the password using the reset token
      const response = await axios.post(`/reset-password/${resetToken}`, {
        newPassword: password,
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage("Failed to reset password");
    } finally {
      setLoading(false); // Set loading to false after response (success or error)
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://d3nn873nee648n.cloudfront.net/1200x1800-new/20476/PK1048596.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 text-center my-8">
        <h4 className="text-2xl font-bold mb-4 animate-bounce">
          {generateColoredLetters()}
        </h4>
        <h3 className="text-xl font-mono font-bold mb-2">Reset Password</h3>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-700 text-sm">
              New Password:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-700 text-sm">
              Confirm Password:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs mt-1">{successMessage}</p>
          )}
          <button
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="loader border-4 border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
