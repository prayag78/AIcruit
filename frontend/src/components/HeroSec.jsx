import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const HeroSec = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverPosition({ x: 50, y: 50 });
  };

  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen overflow-hidden bg-white">
      <div>
        {/* Hero Section */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="grid lg:mt-20 gap-12 lg:grid-cols-2">
            {/* Left Column - Text Content */}
            <div className="max-w-2xl z-10 mt-4 pt-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl tracking-wide">
                Land Your Dream Job Effortlessly with
                <span className="text-blue2">AI-Powered</span> Matching
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600">
                Get the best recommendations!
              </p>
              <div className="mt-8">
                <button
                  onClick={() => {
                    navigate("/portal");
                    scrollTo(0, 0);
                  }}
                  className="inline-flex items-center rounded-full bg-blue2 px-8 py-3 text-base font-medium text-white hover:bg-blue2/90"
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Right Column - Image (Hidden on small devices) */}
            <div
              className="hidden lg:block relative mx-auto w-full max-w-lg lg:max-w-none z-10 m-2 p-4"
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
                className="absolute w-48 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 px-3"
                style={{
                  top: "-5%",
                  left: "-2%",
                  transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${
                    -(hoverPosition.y - 50) / 3
                  }%)`,
                  zIndex: 20,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <img
                  src={assets.ai}
                  alt="AI Recommendation icon"
                  className="w-6 h-6"
                />
                <span>AI Recommendation</span>
              </div>
              <div
                className="absolute w-52 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 px-3"
                style={{
                  top: "30%",
                  right: "10%",
                  transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${
                    -(hoverPosition.y - 50) / 3
                  }%)`,
                  zIndex: 20,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <img
                  src={assets.track}
                  alt="Application Tracking icon"
                  className="w-6 h-6"
                />
                <span>Application Tracking</span>
              </div>
              <div
                className="absolute w-44 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 px-3"
                style={{
                  top: "70%",
                  left: "15%",
                  transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${
                    -(hoverPosition.y - 50) / 3
                  }%)`,
                  zIndex: 20,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <img
                  src={assets.checkList}
                  alt="Easy Apply icon"
                  className="w-6 h-6"
                />
                <span>Easy Apply</span>
              </div>
              <div
                className="absolute w-44 h-16 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 px-3"
                style={{
                  top: "95%",
                  right: "17%",
                  transform: `translate(${-(hoverPosition.x - 50) / 3}%, ${
                    -(hoverPosition.y - 50) / 3
                  }%)`,
                  zIndex: 20,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <img
                  src={assets.send}
                  alt="Email Updates icon"
                  className="w-6 h-6"
                />
                <span>Email Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Pattern */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0">
          <img src={assets.wave} className="w-full h-4/5" alt="Wave Pattern" />
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
