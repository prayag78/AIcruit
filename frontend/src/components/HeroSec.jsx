import React, { useState } from "react";
import { assets } from "../assets/assets";

const HeroSec = () => {
      const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 }); 
    
      const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100; 
        const y = ((e.clientY - top) / height) * 100;
        setHoverPosition({ x, y });
      };
    
      const handleMouseLeave = () => {
        setHoverPosition({ x: 50, y: 50 });
      }
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
          <div>
            {/* Hero Section */}
            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 ">
              <div className="grid mt-20 gap-12 lg:grid-cols-2">
                {/* Left Column - Text Content */}
                <div className="max-w-2xl z-10 mt-4 pt-6">
                  <h1 className="text-xl tracking-tight sm:text-5xl lg:text-5xl">
                    Land Your Dream Job Effortlessly with
                    <span className="text-blue2">AI-Powered</span> Matching
                  </h1>
                  <p className="mt-6 text-xl text-gray-600">
                    Get the best recommendations!
                  </p>
                  <div className="mt-8">
                    <button className="inline-flex items-center rounded-full bg-blue2 px-8 py-3 text-base font-medium text-white hover:bg-blue2/90">
                      Apply Now
                    </button>
                  </div>
                </div>
    
                {/* Right Column - Image */}
                <div
                  className="relative mx-auto w-full max-w-lg lg:max-w-none z-10 m-4 p-4"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={assets.hero_sec}
                    alt="AI-Powered Job Matching Illustration"
                    className="transform scale-150 relative"
                  />
                  {/* Divs with AI Services */}
                  <div
                    className="absolute w-40 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-sm font-medium text-gray-700"
                    style={{
                      top: "-5%",
                      left: "-2%",
                      transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${-(hoverPosition.y - 50) / 3}%)`,
                      zIndex: 20,
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    AI Service 1
                  </div>
                  <div
                    className="absolute w-40 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-sm font-medium text-gray-700"
                    style={{
                      top: "30%",
                      right: "10%",
                      transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${-(hoverPosition.y - 50) / 3}%)`,
                      zIndex: 20,
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    AI Service 2
                  </div>
                  <div
                    className="absolute w-40 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-sm font-medium text-gray-700"
                    style={{
                      top: "70%",
                      left: "15%",
                      transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${-(hoverPosition.y - 50) / 3}%)`,
                      zIndex: 20,
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    AI Service 3
                  </div>
                  <div
                    className="absolute w-40 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center text-sm font-medium text-gray-700"
                    style={{
                      top: "95%",
                      right: "17%",
                      transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${-(hoverPosition.y - 50) / 3}%)`,
                      zIndex: 20,
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    AI Service 4
                  </div>
                </div>
              </div>
            </section>
    
            {/* Wave Pattern */}
            <div className="absolute bottom-20 left-0 right-0">
              <img src={assets.wave} className="w-full h-4/5" alt="Wave Pattern" />
            </div>
          </div>
        </div>
  )
}

export default HeroSec