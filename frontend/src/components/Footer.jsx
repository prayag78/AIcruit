import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6">
        {/* Left Section - Email & Copyright */}
        <div className="mb-4 md:mb-0">
          <div className="w-32 h-12 bg-gray-300 mb-2"></div>
          {/* Placeholder for Logo */}
          <a
            href="mailto:support@hireme.com"
            className="text-blue-600 hover:underline"
          >
            support@hireme.com
          </a>
          <p className="text-gray-500 text-sm mt-1">
            © 2025 HireMe. All Rights Reserved.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-black mb-2">Quick Links</h3>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Jobs
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Internships
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Pricing
          </a>
        </div>

        {/* Middle Section - Connect With Us */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-black mb-2">Connect With Us</h3>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Instagram
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Twitter X
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            LinkedIn
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Facebook
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Discord
          </a>
        </div>

        {/* Right Section - Company Info */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-black mb-2">Company Info</h3>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            About Us
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
