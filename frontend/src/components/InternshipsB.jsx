import React from "react";
import { assets } from "../assets/assets";
import { jobsB_h } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const InternshipsB = () => {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    navigate("/portal?applicationtype=internship");
  };
  return (
    <div className="flex flex-col px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row justify-around items-center bg-white m-4 sm:m-10 gap-10">
        {/* Left Content */}
        <div className="flex flex-col justify-start max-w-md text-center lg:text-left">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          Launch Your Career with the Perfect Internship
          </p>
          <p className="mt-6 text-lg sm:text-xl text-gray-600">
          Step into the professional world with opportunities that match your passion.</p>
          <div className="flex justify-center lg:justify-start space-x-4 mt-5">
            <button
              onClick={handleFindJobs}
              className="inline-flex items-center rounded-full bg-blue2 px-8 py-2 sm:px-8 sm:py-2 sm:text-base font-medium text-white hover:bg-blue2/90"
            >
              Find Internship
            </button>
            <button
              onClick={() => navigate("/recruiter-login")}
              className="inline-flex items-center rounded-full bg-white px-8 py-2 sm:px-8 sm:py-2 sm:text-base font-medium text-blue2 border-2 border-blue2"
            >
              Post Internship
            </button>
          </div>
        </div>
        {/* Right Animation (Hidden on small screens) */}
        <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] items-center justify-center hidden md:flex">
          {/* Background animated logos */}
          {jobsB_h.map((item, i) => (
            <div
              key={i}
              className="absolute h-14 w-14 flex items-center justify-center rounded-lg bg-blue-200 animate-spin-slow mt-20 ml-12"
              style={{ animationDelay: `${i * (20 / 6)}s` }}
            >
              <img src={item.logo} className="w-10 h-10 object-contain" />
            </div>
          ))}

          {/* Foreground Image */}
          <img
            src={assets.jobsB}
            alt="Professional looking for job opportunities"
            className="absolute z-10 h-full w-full object-contain scale-125"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col items-center sm:flex-row sm:justify-evenly space-y-6 sm:space-y-0 sm:space-x-10 m-4 sm:m-10 mt-20">
        <div className="flex flex-col font-semibold text-lg text-center sm:text-left">
          <p>Jobs</p>
          <p>Category</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Data Analyst",
            "Software Development",
            "Design",
            "Marketing",
            "Data Science",
            "Product Management",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gray-200 px-6 py-3 rounded-lg text-black shadow-sm cursor-pointer hover:bg-gray-300 transition"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipsB;
