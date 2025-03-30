import React, { useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { utoken, setUtoken, token, setToken , userData } = useContext(AppContext);

  // Hide Navbar on login pages
  const loginPages = ["/login", "/recruiter-login", "/user-login"];
  if (loginPages.includes(location.pathname)) return null;

  return (
    <div className="flex items-center justify-between text-sm py-2 px-2 border-b border-gray-200">
      <NavLink to="/">
        <img
          src={assets.institute_icon}
          width="20px"
          height="20px"
          className="cursor-pointer"
        />
      </NavLink>

      <ul className="flex gap-16 items-center">
        {/* Show User Pages if utoken exists */}
        {utoken && (
          <>
            <NavLink to="/jobs">
              <li className="py-1">Jobs</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink>
            <NavLink to="/internships">
              <li className="py-1">Internships</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink>
            <NavLink to="/pricing">
              <li className="py-1">Pricing</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink>
            <NavLink to="/about">
              <li className="py-1">About</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink>
            <NavLink to="/contact">
              <li className="py-1">Contact</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink>
            <NavLink to="/profile">
              <li className="py-1 mr-6 ">
              {userData?<img src={userData.image} width="26px" height="24px" className="rounded-full" />:<img src={assets.profile_icon} width="26px" height="24px" className="rounded-full"  />}
              </li>
            </NavLink>
          </>
        )}

        {/* Show Recruiter Pages if token exists */}
        {token && (
          <>
            {/* <NavLink to="/dashboard">
              <li className="py-1">Dashboard</li>
              <hr className="border-none outline-none h-0.5 bg-blue1 w-10/12 m-auto hidden " />
            </NavLink> */}
            <NavLink to="/recruiter-profile">
            <li className="py-1">
                <img src={assets.profile_icon} width="20px" height="20px" />
            </li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
