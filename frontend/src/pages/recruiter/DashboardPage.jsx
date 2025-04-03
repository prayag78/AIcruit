import React, { useContext } from "react"; 
import { AppContext } from "../../context/AppContext";
import {useNavigate } from "react-router-dom"; 

const DashboardPage = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Recruiter Profile</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
