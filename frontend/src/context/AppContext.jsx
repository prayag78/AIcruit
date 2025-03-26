import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [utoken, setUtoken] = useState(localStorage.getItem("utoken") || "");
  const [userData, setUserData] = useState(null);
  const [alljobs, setAlljobs] = useState([]);
  const [allinternships, setAllinternships] = useState([]);
  
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
      if (!utoken) return;
      const { data } = await axios.get(`${backendUrl}/api/user/user-data`, {
        headers: { token: utoken },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAllJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/active-jobs`);
      if (data.success) {
        setAlljobs(data.jobs);
      } else {
        console.error("Error fetching jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  }

  // const fetchAllInternships = async () => {
  //   try {
  //     const { data } = await axios.get(`${backendUrl}/api/recruiter/active-internships`);
  //     if (data.success) {
  //       setAllinternships(data.internships);
  //     } else {
  //       console.error("Error fetching internships:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching internships", error);
  //   }
  // }

  const fetchAllInternships = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/active-internships`);
      
      // console.log("fetchAllInternships API Response:", data); // ✅ Debugging Log
  
      if (data.success) {
        setAllinternships(data.jobs || []);
      } else {
        console.error("Error fetching internships:", data.message);
        setAllinternships([]);
      }
    } catch (error) {
      console.error("Error fetching internships", error);
      setAllinternships([]);
    }
  };
  

  // console.log("appContext:allJObs" , alljobs)
  // console.log("appContextL:allIntern" , allinternships)

  // useEffect(() => {
  //   userProfile();
  // }, [utoken]);

  // useEffect(() => {
  //   fetchJobs();
  // }, [utoken]);

  // useEffect(() => {
  //   fetchAllJobs();
  // }, [utoken]);

  // useEffect(() => {
  //   fetchAllInternships();
  // }, [utoken]);

  useEffect(() => {
    if (utoken) {
      userProfile().then(() => {
        fetchJobs();
        fetchAllJobs();
        fetchAllInternships();
      });
    }
  }, [utoken]);
  
  const value = {
    backendUrl,
    jobs,
    setJobs,
    token,
    setToken,
    utoken,
    setUtoken,
    userData,
    setUserData,
    userProfile,
    alljobs,
    allinternships,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;