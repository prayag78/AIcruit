import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const U_login = () => {
  const [state, setState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setUtoken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/send-otp`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success("OTP sent to your email");
          setShowOtpPopup(true);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          localStorage.setItem("utoken", response.data.token);
          setUtoken(response.data.token);
          toast.success("Login Success!");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        email,
        otp,
      });
      if (response.data.success) {
        localStorage.setItem("utoken", response.data.token);
        setUtoken(response.data.token);
        toast.success("Registration successful!");
        setShowOtpPopup(false);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Invalid OTP, please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-hidden h-[75vh]">
        <div className="hidden lg:flex flex-1 justify-center items-center bg-blue-50 p-8">
          <img src={assets.uslo} alt="Login Illustration" className="w-80 h-auto scale-125" />
        </div>
        <div className="flex flex-col justify-center items-center p-8 flex-1">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">WELCOME TO <span className=" text-blue2">AICRUIT</span></h2>
          <form onSubmit={onSubmitHandler} className="w-full">
            {state === "Sign Up" && <InputField label="Full Name" type="text" value={name} setValue={setName} />}
            <InputField label="Email" type="email" value={email} setValue={setEmail} />
            <InputField label="Password" type="password" value={password} setValue={setPassword} />
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">{state}</button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            {state === "Sign In" ? "Don't have an account?" : "Already have an account?"} {" "}
            <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setState(state === "Sign In" ? "Sign Up" : "Sign In")}>
              {state === "Sign In" ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
      
      {showOtpPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Enter OTP</h2>
            <InputField label="OTP" type="text" value={otp} setValue={setOtp} />
            <button onClick={verifyOtpHandler} className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300">
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

export default U_login;
