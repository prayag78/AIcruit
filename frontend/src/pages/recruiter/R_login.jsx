import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const R_login = () => {
  const [state, setState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AppContext);

  // Handle Sign-Up or Sign-In
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        // Call the API to send OTP
        const response = await axios.post(`${backendUrl}/api/recruiter/send-otp`, {
          name,
          email,
          password,
          company,
          location,
          phone,
        });

        if (response.data.success) {
          toast.success("OTP sent to your email!");
          setShowOtpPopup(true); // Show OTP popup
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Handle Sign-In
        const response = await axios.post(`${backendUrl}/api/recruiter/login`, {
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Login Success!");
          navigate("/dashboard");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  // Handle OTP Verification
  const verifyOtpHandler = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/recruiter/register`, {
        email,
        otp,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("OTP Verified! Registration Successful.");
        setShowOtpPopup(false); // Hide OTP popup
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-hidden">
        {/* Left Side (Illustration) */}
        <div className="hidden lg:flex flex-1 justify-center items-center bg-blue-50 p-8">
          <img src="/your-illustration.png" alt="Login Illustration" className="w-80 h-auto" />
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col justify-center items-center p-8 flex-1">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            STEP INTO THE FUTURE OF HIRING WITH AIcruit.
          </h2>

          <form onSubmit={onSubmitHandler} className="w-full">
            {state === "Sign Up" && (
              <>
                <InputField label="Full Name" type="text" value={name} setValue={setName} />
                <InputField label="Company" type="text" value={company} setValue={setCompany} />
                <InputField label="Location" type="text" value={location} setValue={setLocation} />
                <InputField label="Phone" type="text" value={phone} setValue={setPhone} />
              </>
            )}

            <InputField label="Email" type="email" value={email} setValue={setEmail} />
            <InputField label="Password" type="password" value={password} setValue={setPassword} />

            {/* Sign-In / Sign-Up Button */}
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
              {state}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p className="mt-4 text-sm text-gray-600">
            {state === "Sign In" ? "Don't have an account?" : "Already have an account?"} {" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setState(state === "Sign In" ? "Sign Up" : "Sign In")}
            >
              {state === "Sign In" ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Enter OTP</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              A 6-digit OTP has been sent to your email. Please enter it below.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={verifyOtpHandler}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, type, value, setValue }) => (
  <div className="w-full mb-4">
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export default R_login;