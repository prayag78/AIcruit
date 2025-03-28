import React, { useContext } from "react"; 
import { AppContext } from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom"; 

const Rprofile = () => {
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

export default Rprofile;
