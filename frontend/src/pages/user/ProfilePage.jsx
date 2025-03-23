import React, { useContext } from "react"; 
import { AppContext } from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom"; 


const ProfilePage = () => {
  const { utoken, setUtoken } = useContext(AppContext);
  const navigate = useNavigate(); 

  const logout = () => {
    setUtoken("");
    localStorage.removeItem("utoken");
    navigate("/user-login");
  };
  return (
    <div>
      <h1>Recruiter Profile</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};


export default ProfilePage