// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React from 'react'
// import Home from './pages/home'
// import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
// import MainLayout from './MainLayout';
// import SignupCustomer from './pages/signupCustomer';
// import Aboutus from './pages/aboutUs';
// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/create-account" element={<SignupCustomer />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/aboutus" element={<Aboutus />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import MainLayout from './MainLayout';
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/aboutUs';
import OTPVerification from './pages/CustomerVerification';
import LoginPage from './pages/signin'; // Import LoginPage
import WorkerManagementForm from './pages/serviceProviderLogin'; // Import the service provider page
import FindService from './pages/findService';
import AdminDashboard from './pages/AdminDashboard';
import ManageCustomers from './pages/AdminManageCustomers';
import ManageWorkers from './pages/AdminManageWorkers';
import AdminLayout from './pages/AdminLayout';
import SignupChoice from './pages/SignupChoice';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="/create-account" element={<SignupCustomer />} />
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/verify-customer" element={<OTPVerification />} />
            <Route path="/signin" element={<LoginPage />} /> {/* Add Sign-in Route */}
            <Route path="/service-provider" element={<WorkerManagementForm />} />
            <Route path="/signup-choice" element={<SignupChoice />} />
            <Route path="/findService" element={<FindService />} />
        </Route>



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


