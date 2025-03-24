import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../../assets/logo2.png';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext); // Get auth status
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToSignup = () => {
    navigate("/signup-choice");
  };

  const goToProfile = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "worker") {
      navigate("/workerProfile");
    } else {
      navigate("/customerProfile");
    }
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToServices = () => {
    navigate("/findService");
  };

  const handleLogout = () => {
    logout();
    navigate("/signin"); // Redirect to login after logout
  };

  return (
    <>
      <AppBar
        id="navbar"
        position="fixed"
        sx={{
          backgroundColor: "rgba(230, 233, 232, 0.7)", // Transparent
          backdropFilter: "blur(3px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(10px)", // Safari support
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
          color: "black",
          borderRadius: "12px", // Rounded edges
          margin: "10px", // Space around navbar
          width: "calc(100% - 40px)", // Prevent full-width stretch
          left: "10px",
          right: "10px",
        }}
      >
        <Toolbar>
          {/* Logo on the Left */}
          <Box component="img" src={logo} alt="Logo" sx={{ height: 45 }} />

          {/* Navbar Buttons (Right Side) */}
          <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
            <Button sx={{ color: "black", fontWeight: "bold", "&:hover": { color: "#ef5350" } }} onClick={goToHome}>
              Home
            </Button>

            {/* Show Sign In and Sign Up if NOT authenticated */}
            {!isAuthenticated && (
              <>
                <Button sx={{ color: "black", fontWeight: "bold", "&:hover": { color: "#ef5350" } }} onClick={goToSignin}>
                  LOGIN
                </Button>
                <Button sx={{ color: "black", fontWeight: "bold", "&:hover": { color: "#ef5350" } }} onClick={goToSignup}>
                  SIGNUP
                </Button>
              </>
            )}

            {/* Show Profile Icon if authenticated */}
            {isAuthenticated && (
              <>
              <Button sx={{ color: "black", fontWeight: "bold", "&:hover": { color: "#ef5350" } }} onClick={goToServices}>
              Find Services
            </Button>

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
              </>
              
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
              <MenuItem onClick={goToProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}



