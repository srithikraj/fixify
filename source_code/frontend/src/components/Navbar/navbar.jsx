import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../../assets/logo.png';
<<<<<<< Updated upstream:source_code/frontend/src/components/Navbar/navbar.jsx
=======
import React from "react";
import { Link } from "react-router-dom";

>>>>>>> Stashed changes:source_code/src/components/Navbar/navbar.jsx
export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
<<<<<<< Updated upstream:source_code/frontend/src/components/Navbar/navbar.jsx

  const goToSignup = () => {
    navigate("/create-account")
  }
=======
  
>>>>>>> Stashed changes:source_code/src/components/Navbar/navbar.jsx
  return (
    <>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
      </ul>
      {/* Frosted Glass Navbar with Rounded Edges */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(230, 233, 232, 0.7)", // Transparent
          // backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(10px)", // Safari support
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
          color: "black",
          borderRadius: "12px", // Rounded edges
          margin: "10px", // Space around navbar
          width: "calc(100% - 20px)", // Prevent full-width stretch
          left: "10px",
          right: "10px",
        }}
      >
        <Toolbar>
          {/* Logo on the Left */}
          <Box component="img" src={logo} alt="Logo" sx={{ height: 60 }} />

          {/* Navbar Buttons (Right Side) */}
          <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
            <Button sx={{ color: "#313131", fontWeight: "bold", "&:hover": { color: "#ef5350" } }}>Home</Button>
            <Button sx={{ color: "#313131", fontWeight: "bold", "&:hover": { color: "#ef5350" } }}>LOGIN</Button>
            <Button sx={{ color: "#313131", fontWeight: "bold", "&:hover": { color: "#ef5350" } }} onClick={goToSignup}>SIGNUP</Button>

            {/* Profile Icon */}
            {auth && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: "black" }}
              >
                <AccountCircle />
              </IconButton>
            )}

            {/* Dropdown Menu for Profile */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Add margin to prevent content from being hidden behind Navbar */}
      {/* <Box sx={{ mt: 8 }} /> */}
    </>
  );
}