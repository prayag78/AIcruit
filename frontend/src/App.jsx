// App.jsx
import React, { useContext } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Navbar from "./components/Navbar";
import JobsPage from "./pages/user/JobsPage";
import InternshipsPage from "./pages/user/InternshipsPage";
import Pricing from "./pages/user/Pricing";
import ProfilePage from "./pages/user/ProfilePage";
import Footer from "./components/Footer";
import Portal from "./pages/user/Portal";
import Login from "./pages/Login";
import R_login from "./pages/recruiter/R_login";
import U_login from "./pages/user/U_login";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./pages/recruiter/DashboardPage";
import Rprofile from "./pages/recruiter/Rprofile";
import RecruiterLayout from "./components/RecruiterLayout";
import { AppContext } from "./context/AppContext";
import AddJobs from "./components/AddJobs";
import Applications from "./components/Applications";
import ManageJobs from "./components/ManageJobs";

const App = () => {
  const { token, utoken } = useContext(AppContext);
  const location = useLocation();

  // List of login-related routes where navbar and footer should NOT be shown
  const loginPages = ["/login", "/recruiter-login", "/user-login"];
  const isLoginPage = loginPages.includes(location.pathname);

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter-login" element={<R_login />} />
        <Route path="/user-login" element={<U_login />} />

        {/* User Routes */}
        {utoken && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/portal/:id" element={<Portal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Recruiter Routes */}
        {token && (
          <Route element={<RecruiterLayout />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="/recruiter-profile" element={<Rprofile />} />
            <Route path="/post" element={<AddJobs />} />
            <Route path="/manage" element={<ManageJobs />} />
            <Route path="/applicantions" element={<Applications />} />
            <Route path="*" element={<ManageJobs/>} />
          </Route>
        )}
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;
