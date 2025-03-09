import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/user/About'
import Contact from './pages/user/Contact'
import Navbar from './components/Navbar'
import JobsPage from './pages/user/JobsPage'
import InternshipsPage from './pages/user/InternshipsPage'
import Pricing from './pages/user/Pricing'
import ProfilePage from './pages/user/ProfilePage'
import Footer from './components/Footer'
const App = () => {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobs" element={<JobsPage/>} />
        <Route path="/internships" element={<InternshipsPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/profile" element={<ProfilePage/>} />

      </Routes>
      <Footer/>
    
    </div>
  )
}

export default App