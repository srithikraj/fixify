import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar /> {/* Navbar will appear on all pages */}
      <Outlet /> {/* This renders the current page inside MainLayout */}
    </>
  );
};

export default MainLayout;
