// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import MainLayout from './MainLayout';
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/aboutUs';
import OTPVerification from './pages/CustomerVerification';
import LoginPage from './pages/signin'; // Import LoginPage
import WorkerManagementForm from './pages/serviceProviderMgmt'; // Import the service provider page

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-account" element={<SignupCustomer />} />
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/verify-customer" element={<OTPVerification />} />
          <Route path="/signin" element={<LoginPage />} /> {/* Add Sign-in Route */}
          <Route path="/service-provider" element={<WorkerManagementForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App



