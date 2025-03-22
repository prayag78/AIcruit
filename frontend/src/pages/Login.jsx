import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
      const navigate = useNavigate();
    
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-[100vh] w-full bg-gray-100">
      {/* Recruiter Section */}
      <div className="flex flex-col items-center justify-center text-center bg-blue-50 rounded-lg w-full lg:w-1/2 lg:h-full p-6 sm:p-8">
        <p className="text-lg font-semibold mb-4">I'm here for Hiring</p>
        <img
          src={assets.recruiter}
          alt="Recruiter"
          className="w-4/6 h-auto mb-4 sm:w-1/2 lg:w-2/3"
        />
        <button onClick={()=>navigate("/recruiter-login")} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Sign in here as Hiring Leader
        </button>

      </div>

      {/* Job Seeker Section */}
      <div className="flex flex-col items-center justify-center text-center bg-green-50 rounded-lg w-full lg:w-1/2 lg:h-full p-6 sm:p-8">
        <p className="text-lg font-semibold mb-4">I'm here for a Job</p>
        <img
          src={assets.jobseeker}
          alt="Job Seeker"
          className="w-4/6 h-auto mb-4 sm:w-1/2 lg:w-2/3"
        />
        <button onClick={()=>navigate("/user-login")} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
          Sign in here as a Job Seeker
        </button>

      </div>
    </div>
  );
};

export default Login;