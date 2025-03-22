import React from "react";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter-login" element={<R_login />} />
        <Route path="/user-login" element={<U_login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
