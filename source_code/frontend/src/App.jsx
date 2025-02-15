// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignupCustomer from './pages/signupCustomer';
import OTPVerification from './pages/CustomerVerification';
import Aboutus from './pages/aboutUs';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<SignupCustomer />} />
          <Route path="/verify-customer" element={<OTPVerification />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App