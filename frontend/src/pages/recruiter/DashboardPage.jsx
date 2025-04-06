import React, { useContext } from "react"; 
import { AppContext } from "../../context/AppContext";
import {useNavigate } from "react-router-dom";
import RecruiterProfile from "../../components/RecruiterProfile"; 

const DashboardPage = () => {

  return (
    <div>
      <RecruiterProfile />
      
    </div>
  );
};

export default DashboardPage;
