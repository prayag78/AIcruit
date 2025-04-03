import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
import { assets } from "../assets/assets";

const Faq = () => {
  const [openSections, setOpenSections] = useState([]);

  const sections = [
    {
      title: "Best-in-class intelligence and talent insights",
      content:
        "Powered by deep-learning AI, we surface insights when and where you need them most",
    },
    {
      title: "Seamless recruitment experience",
      content:
        "Our platform ensures a smooth hiring process from start to finish, making talent acquisition effortless.",
    },
    {
      title: "Data-driven decision making",
      content:
        "Make smarter hiring choices with real-time analytics and deep insights into the talent pool.",
    },
  ];

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[85vh] bg-[#2b3343] text-white pt-3">
      {/* Left Section - FAQ */}
      <div className="w-full lg:w-1/2 mx-auto m-4 p-4">
        <h1 className="text-3xl lg:text-5xl mb-6 text-left">Why AIcruit</h1>
        <p className="text-lg lg:text-[22px] m-2 mb-4">
          Great talent teams deserve a great platform. That’s why we built a
          single AI platform that does it all:
        </p>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between w-full p-4 text-left bg-transparent hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ChevronUp
                  className={`w-5 h-5 text-[#25a0e1] transition-transform ${
                    openSections.includes(index) ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`transition-all overflow-hidden ${
                  openSections.includes(index)
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="p-4 text-gray-300">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Image (Hidden on small screens) */}
      <div className="hidden lg:block w-5/12 mt-6 relative h-[45vh]">
        <div className="bg-blue2 w-3/4 h-60 absolute right-0 top-[60%] rounded-tl-[100px] rounded-bl-[100px] z-0"></div>
        <img
          src={assets.hero_sec2}
          alt="AI-Powered Job Matching Illustration"
          width={550}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default Faq;