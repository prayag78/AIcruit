import React from "react";
import { Lock } from "lucide-react";
import { assets } from "../assets/assets";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Jobs_B = () => {
  const jobCategories = [
    {
      title: "Full-Stack Roles",
      openings: "50+ openings",
      icons: 4,
    },
    {
      title: "Full-Stack Roles",
      openings: "50+ openings",
      icons: 4,
    },
    {
      title: "Full-Stack Roles",
      openings: "50+ openings",
      icons: 4,
    },
    {
      title: "Full-Stack Roles",
      openings: "50+ openings",
      icons: 4,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Find Role Based Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobCategories.map((category, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-4 flex flex-col shadow-md">
            <h3 className="font-medium text-lg">{category.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{category.openings}</p>
            <div className="flex mt-auto space-x-2">
              {Array.from({ length: category.icons }).map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center bg-gray-400">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Post Jobs & Internship Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Text and CTA */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Post Jobs & Internship</h1>
            <button onClick={()=> navigate('/recruiter-login')} className="bg-[#1a4677] hover:bg-[#0f3561] text-white rounded-full px-8 py-2">Post Now</button>
          </div>
          {/* Right side - Illustration */}
          <div className="md:w-1/2 relative">
            <img
              src={assets.Programmer_bro}  
              alt="Developer working on laptop with programming language icons"
              width={500}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs_B;
