import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { generateColoredLetters } from "./Nav";

const Forget = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [otpSent1, setOtpSent1] = useState(false);
  const [countdown1, setCountdown1] = useState(300);
  const [timerActive1, setTimerActive1] = useState(false);
  const [otpFieldDisabled, setOtpFieldDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          setTimerActive(false);
          setOtpFieldDisabled(false);
          setOtpSent(false);
          setCountdown(60);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown, timerActive]);

  useEffect(() => {
    let interval;

    if (timerActive1) {
      interval = setInterval(() => {
        if (countdown1 > 0) {
          setCountdown1((prevCountdown) => prevCountdown - 1);
        } else {
          setTimerActive1(false);
          setOtpSent1(false);
          setCountdown1(300);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown1, timerActive1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleGetOTP = async () => {
    try {
      if (!formData.email) {
        setErrorMessage1("Please enter your email");
        return;
      }
      setOtpLoading(true);
      await axios.post("https://levitation-infotech.vercel.app/generate-otp", {
        email: formData.email,
      });
      setOtpSent(true);
      setTimerActive(true);
      setOtpSent1(true);
      setTimerActive1(true);
      setOtpFieldDisabled(false);
    } catch (error) {
      setErrorMessage("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://levitation-infotech.vercel.app/forget",
        formData
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
      } else {
        setErrorMessage("Failed");
      }
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;

        if (status === 422) {
          setErrorMessage(data.error);
        } else if (status === 400) {
          setErrorMessage(data.error);
        } else if (status === 404) {
          setErrorMessage(data.error);
        } else if (status === 401) {
          setErrorMessage(data.error);
        } else if (status === 500) {
          setErrorMessage(data.error);
        }
      } else {
        setErrorMessage("Network error occurred");
      }
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
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 text-center my-8 mt-20">
        <h4 className="text-2xl font-bold mb-4 animate-bounce">
          {generateColoredLetters()}
        </h4>
        <h3 className="text-xl font-mono font-bold mb-2">Forget Password</h3>
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
          {errorMessage1 && (
            <p className="text-red-500 text-xs mb-4">{errorMessage1}</p>
          )}
          <div className="mb-4 w-full flex items-center gap-2">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              name="otp"
              placeholder="Enter the OTP"
              value={formData.otp}
              onChange={handleChange}
              disabled={otpFieldDisabled}
            />
            <button
              type="button"
              className={`w-32 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 ${
                otpSent ? "disabled:opacity-50" : ""
              }`}
              onClick={handleGetOTP}
              disabled={otpSent || otpLoading}
            >
              {otpLoading ? (
                <div className="loader border-4 border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mx-auto" />
              ) : otpSent ? (
                `Resend OTP in ${Math.floor(countdown / 60)}:${(
                  "0" +
                  (countdown % 60)
                ).slice(-2)}`
              ) : (
                "Get OTP"
              )}
            </button>
          </div>
          {otpSent1 && (
            <p className="text-green-500 text-xs font-bold mb-4">
              OTP sent to your email. Expires in {Math.floor(countdown1 / 60)}:
              {("0" + (countdown1 % 60)).slice(-2)}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
          )}
          {success && <p className="text-green-500 text-xs mb-4">{success}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="loader border-4 border-t-4 border-blue-500 border-solid rounded-full w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Forget Password"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Sign In
          </NavLink>
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
            onClick={() => navigate("/login")}
          >
            Sign In
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

export default Forget;
