// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import React from 'react'
// // import Home from './pages/home'
// // import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
// // import MainLayout from './MainLayout';
// // import SignupCustomer from './pages/signupCustomer';
// // import Aboutus from './pages/aboutUs';
// // const App = () => {
// //   return (
// //     <div>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/create-account" element={<SignupCustomer />} />
// //           <Route path="/" element={<Home />} />
// //           <Route path="/aboutus" element={<Aboutus />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   )
// // }

// // export default App


// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React from 'react'
// import Home from './pages/home'
// import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
// import MainLayout from './MainLayout';
// import SignupCustomer from './pages/signupCustomer';
// import Aboutus from './pages/aboutUs';
// import OTPVerification from './pages/CustomerVerification';
// import LoginPage from './pages/signin'; // Import LoginPage
// import ServiceProviderSignup from './pages/serviceProviderSignup'; // Import the service provider page
// import FindService from './pages/findService';
// import AdminDashboard from './pages/AdminDashboard';
// import ManageCustomers from './pages/AdminManageCustomers';
// import ManageWorkers from './pages/AdminManageWorkers';
// import AdminLayout from './pages/AdminLayout';
// import SignupChoice from './pages/SignupChoice';
// import ContactUs from './pages/ContactUs';

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//         <Route path="/" element={<MainLayout />}>
//             <Route path="/create-account" element={<SignupCustomer />} />
//             <Route path="/" element={<Home />} />
//             <Route path="/aboutus" element={<Aboutus />} />
//             <Route path="/verify-customer" element={<OTPVerification />} />
//             <Route path="/signin" element={<LoginPage />} /> {/* Add Sign-in Route */}
//             <Route path="/service-provider" element={<ServiceProviderSignup />} />
//             <Route path="/signup-choice" element={<SignupChoice />} />
//             <Route path="/findService" element={<FindService />} />
//             <Route path="/contactus" element={<ContactUs />} />
//         </Route>



//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="customers" element={<ManageCustomers />} />
//             <Route path="workers" element={<ManageWorkers />} />
//         </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App




import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // Import AuthContext
import MainLayout from './MainLayout';
import Home from './pages/home';
import SignupCustomer from './pages/signupCustomer';
import Aboutus from './pages/AboutUs';
import OTPVerification from './pages/CustomerVerification';
import LoginPage from './pages/signin';
import ServiceProviderSignup from './pages/serviceProviderSignup';
import FindService from './pages/findService';
import AdminDashboard from './pages/AdminDashboard';
import ManageCustomers from './pages/AdminManageCustomers';
import ManageWorkers from './pages/AdminManageWorkers';
import AdminLayout from './pages/AdminLayout';
import SignupChoice from './pages/SignupChoice';
import ContactUs from './pages/ContactUs';
import CustomerProfile from './pages/CustomerProfile';
import ProtectedRoute from './components/ProtectedRoute'; // Import Protected Route
import WorkerProfile from './pages/WorkerProfile';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app inside AuthProvider */}
      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="create-account" element={<SignupCustomer />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="verify-customer" element={<OTPVerification />} />
            <Route path="signin" element={<LoginPage />} />
            <Route path="service-provider" element={<ServiceProviderSignup />} />
            <Route path="signup-choice" element={<SignupChoice />} />
            <Route path="findService" element={<FindService />} />
            <Route path="contactus" element={<ContactUs />} />
            {/* <Route path="CustomerProfile" element={<CustomerProfile />} /> */}
            <Route path="/CustomerProfile" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
            <Route path="/WorkerProfile" element={<ProtectedRoute><WorkerProfile /></ProtectedRoute>} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<ManageCustomers />} />
            <Route path="workers" element={<ManageWorkers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
