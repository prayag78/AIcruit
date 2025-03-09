import React from "react";
import { assets } from "../assets/assets";
import { jobsB_h } from "../assets/assets";

const JobsB = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-around items-center px-6 py-12 bg-white m-10">
        <div className="flex flex-col justify-start max-w-md ">
          <p className="text-xl tracking-tight sm:text-5xl lg:text-5xl">
            Your Dream Job Is Just a Click Away
          </p>
          <p className="mt-6 text-xl text-gray-600">
            Connect with the best companies and secure your ideal role
          </p>
          <div className="flex justify-start space-x-4 mt-3">
            <button className="inline-flex items-center rounded-full bg-blue2 px-8 py-2 text-base font-medium text-white hover:bg-blue2/90">
              Find Jobs
            </button>
            <button className="inline-flex items-center rounded-full bg-white px-8 py-2 text-base font-medium text-blue2 border-2 border-blue2">
              Post Jobs
            </button>
          </div>
        </div>

        <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] flex items-center justify-center ">
          {/* Background animated locks */}
          {jobsB_h.map((item, i) => (
            <div
              key={i}
              className="absolute h-14 w-14 flex items-center justify-center rounded-lg bg-blue-200 animate-spin-slow mt-20 ml-12"
              style={{ animationDelay: `${i * (20 / 6)}s` }}
            >
              <img src={item.logo} />
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

      <div className="flex items-center justify-evenly space-x-10 m-10 mt-20">
        <div className="flex flex-col font-semibold text-lg">
          <p>Jobs</p>
          <p>Category</p>
        </div>
        <div className="flex space-x-6">
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
              className="bg-gray-200 px-6 py-3 rounded-lg text-center text-black shadow-sm cursor-pointer hover:bg-gray-300 transition"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsB;
