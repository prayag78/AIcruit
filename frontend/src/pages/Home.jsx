import React, { useState } from "react";
import { assets } from "../assets/assets";
import HeroSec from "../components/HeroSec";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 });

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
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div>
        <HeroSec />
      </div>

      {/* Text section */}
      <div className=" w-full h-[55dvh] bg-gradient-to-b">
        <div className=" mx-auto px-3 lg:px-60 py-20 md:py-20">
          <h1 className="text-center text-2xl md:text-2xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed bg-gradient-to-r from-[#0C87B8] to-[#645991] bg-clip-text text-transparent">
            Introducing our AI-powered job portal - the ultimate destination for
            your career growth. Harness the power of cutting-edge technology to
            unlock personalized job recommendations, streamline your application
            process
          </h1>
        </div>
      </div>

      {/* Mid section */}
      <div>
        <Faq />
      </div>

      {/* Scroller */}
      <div></div>

      {/* Testimonials section */}
      <div>
        <Testimonials />
      </div>

      {/* Last section */}
      <div className="flex w-full justify-between items-center p-6">
        <div className="flex flex-col items-start w-1/2 lg:ml-12">
          <p className="text-xl lg:text-4xl m-3">
            Maximize your job search potential and increase your chances of
            getting hired today!
          </p>
          <button className="inline-flex items-center rounded-full bg-blue2 ml-3 px-8 py-3 text-xl text-white hover:bg-blue2/90">
            Find Now
          </button>
        </div>
        <div className="w-3/5 flex justify-center mt-10">
          <img src={assets.hero_sec3} width={500} />
        </div>
      </div>
    </div>


  );
};

export default Home;
