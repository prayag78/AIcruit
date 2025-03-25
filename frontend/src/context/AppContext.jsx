import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [jobs, setJobs] = useState([]);
  const [token,setToken] =  useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )
  const [utoken,setUtoken] =  useState(localStorage.getItem('utoken') ? localStorage.getItem('utoken') : '' )
  const [userData , setUserData] = useState(false)

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/jobs`); 
      if (data.success) {
        setJobs(data.jobs);
        
      } else {
        console.error("Error fetching jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  const userProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/user-data`, {
        headers: {
          token: utoken,
        },
      }); 
      console.log(data)
  
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const value = {
    backendUrl,
    jobs,
    setJobs,
    token,setToken,
    utoken,setUtoken,
    userData , setUserData,userProfile
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
