// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/aboutUs';
import OTPVerification from './pages/CustomerVerification';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-account" element={<SignupCustomer />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/verify-customer" element={<OTPVerification />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App