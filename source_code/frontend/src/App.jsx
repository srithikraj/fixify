// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import MainLayout from './MainLayout';
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/aboutUs';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-account" element={<SignupCustomer />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App



