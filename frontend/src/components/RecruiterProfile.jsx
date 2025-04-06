import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'  

const RecruiterProfile = () => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
  
    const logout = () => {
      setToken("");
      localStorage.removeItem("token");
      navigate("/login");
    };
  return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default RecruiterProfile
