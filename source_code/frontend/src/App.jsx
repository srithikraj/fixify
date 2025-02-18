// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/aboutUs';
import OTPVerification from './pages/CustomerVerification';
import LoginPage from './pages/signin'; // Import LoginPage
import WorkerManagementForm from './pages/serviceProviderMgmt'; // Import the service provider page

import AdminDashboard from './pages/AdminDashboard';
import ManageCustomers from './pages/ManageCustomers';
import ManageWorkers from './pages/ManageWorkers';
import AdminLayout from './pages/AdminLayout';
import ContactUs from './pages/contact';
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
          <Route path="/contactus" element={<ContactUs />} />

          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<ManageCustomers />} />
          <Route path="/admin/workers" element={<ManageWorkers />} /> */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<ManageCustomers />} />
            <Route path="workers" element={<ManageWorkers />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App



