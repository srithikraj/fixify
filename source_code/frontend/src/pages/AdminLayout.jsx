import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 6,
    transition: "margin 0.3s",
    marginLeft: open && !isMobile ? "240px" : "130px", // Adjust spacing
    width: `calc(100% - ${open && !isMobile ? "240px" : "60px"})`, // Ensures correct width
  }}
>
  <Sidebar />
  <Outlet />
</Box>


  );
};

export default AdminLayout;
