// Footer.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { utoken } = useContext(AppContext);

  return (
    <footer className="w-full bg-white py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6 gap-8">
        {/* Left Section - Email & Copyright */}
        <div className="mb-4 md:mb-0">
          <div className="w-32 h-12 bg-gray-300 mb-2"></div>
          {/* Placeholder for Logo */}
          <a
            href="mailto:support@AIcruit.com"
            className="text-blue-600 hover:underline"
          >
            support@AIcruit.com
          </a>
          <p className="text-gray-500 text-sm mt-1">
            © 2025 AIcruit. All Rights Reserved.
          </p>
        </div>

        {/* Only render extra sections if utoken exists */}
        {utoken && (
          <>
            {/* Middle Section - Quick Links */}
            <div className="flex flex-col text-start">
              <h3 className="text-black mb-2">Quick Links</h3>
              <NavLink to="/" className="text-gray-500 hover:text-blue-600">
                Home
              </NavLink>
              <NavLink to="/jobs" className="text-gray-500 hover:text-blue-600">
                Jobs
              </NavLink>
              <NavLink
                to="/internships"
                className="text-gray-500 hover:text-blue-600"
              >
                Internships
              </NavLink>
              <NavLink
                to="/pricing"
                className="text-gray-500 hover:text-blue-600"
              >
                Pricing
              </NavLink>
            </div>

            {/* Middle Section - Connect With Us */}
            <div className="flex flex-col text-start">
              <h3 className="text-black mb-2">Connect With Us</h3>
              <NavLink
                to="https://instagram.com"
                className="text-gray-500 hover:text-blue-600"
              >
                Instagram
              </NavLink>
              <NavLink
                to="https://twitter.com"
                className="text-gray-500 hover:text-blue-600"
              >
                Twitter X
              </NavLink>
              <NavLink
                to="https://linkedin.com"
                className="text-gray-500 hover:text-blue-600"
              >
                LinkedIn
              </NavLink>
              <NavLink
                to="https://facebook.com"
                className="text-gray-500 hover:text-blue-600"
              >
                Facebook
              </NavLink>
              <NavLink
                to="https://discord.com"
                className="text-gray-500 hover:text-blue-600"
              >
                Discord
              </NavLink>
            </div>

            {/* Right Section - Company Info */}
            <div className="flex flex-col text-start">
              <h3 className="text-black mb-2">Company Info</h3>
              <NavLink
                to="/about"
                className="text-gray-500 hover:text-blue-600"
              >
                About Us
              </NavLink>
              <NavLink
                to="/privacy"
                className="text-gray-500 hover:text-blue-600"
              >
                Privacy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-gray-500 hover:text-blue-600"
              >
                Terms
              </NavLink>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
