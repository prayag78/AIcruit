import React, { useState } from "react";
import { assets } from "../assets/assets";
import HeroSec from "../components/HeroSec";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div>
        <HeroSec />
      </div>

      {/* Text section */}
      <div className="w-full h-[55dvh] bg-gradient-to-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-60 py-10 md:py-20">
          <h1 className="text-center text-xl sm:text-2xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed bg-gradient-to-r from-[#0C87B8] to-[#645991] bg-clip-text text-transparent">
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
      <div className="md:flex lg:flex-row w-full justify-between items-center p-4 lg:p-6">
        <div className="flex flex-col items-start w-full lg:w-1/2 lg:ml-12">
          <p className="text-xl lg:text-4xl m-3 text-center lg:text-left">
            Maximize your job search potential and increase your chances of
            getting hired today!
          </p>
          <button
            className="inline-flex items-center rounded-full bg-blue2 px-6 py-2 sm:px-8 sm:py-3 text-lg sm:text-xl text-white hover:bg-blue2/90 mx-auto lg:ml-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Find Now
          </button>
        </div>
        <div className="lg:flex w-full lg:w-3/5 justify-center mt-10">
          <img
            src={assets.hero_sec3}
            alt="Job Search Illustration"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
