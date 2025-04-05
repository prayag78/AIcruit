import React, { useContext, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react"; // hamburger + close icon

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { utoken, setUtoken, token, setToken, userData } =
    useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide Navbar on login pages
  const loginPages = ["/login", "/recruiter-login", "/user-login"];
  if (loginPages.includes(location.pathname)) return null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-2 px-4">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <img
            src={assets.logo}
            width="120px"
            height="120px"
            className="cursor-pointer"
          />
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-20 items-center text-sm">
          {utoken && (
            <>
              <NavLink to="/jobs">
                <li>Jobs</li>
                <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
              </NavLink>
              <NavLink to="/internships">
                <li>Internships</li>
                <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
              </NavLink>
              <NavLink to="/about">
                <li>About</li>
                <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
              </NavLink>
              <NavLink to="/contact">
                <li>Contact</li>
                <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
              </NavLink>
              <NavLink to="/profile">
                <li>
                  {userData ? (
                    <img
                      src={userData.image}
                      width="26px"
                      height="24px"
                      className="rounded-full"
                    />
                  ) : (
                    <img
                      src={assets.profile_icon}
                      width="26px"
                      height="24px"
                      className="rounded-full"
                    />
                  )}
                </li>
              </NavLink>
            </>
          )}
          {token && <>{/* Add recruiter stuff if needed */}</>}
        </ul>

        {/* Mobile Icon */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 text-sm px-2">
          {utoken && (
            <>
              <NavLink to="/profile" onClick={toggleMobileMenu}>
                <li className="flex items-center gap-2">Profile</li>
              </NavLink>
              <NavLink to="/jobs" onClick={toggleMobileMenu}>
                <li>Jobs</li>
              </NavLink>
              <NavLink to="/internships" onClick={toggleMobileMenu}>
                <li>Internships</li>
              </NavLink>
              <NavLink to="/about" onClick={toggleMobileMenu}>
                <li>About</li>
              </NavLink>
              <NavLink to="/contact" onClick={toggleMobileMenu}>
                <li>Contact</li>
              </NavLink>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
