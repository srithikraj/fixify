import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from './pages/home'
import ContactUs from "./pages/contact";

function App() {
  return (
    <Router>  {/* Enables Routing */}
      <Routes>  {/* Holds all page routes */}
       <Route path="/" element={<Home />} />
       <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}
export default App