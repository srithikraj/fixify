// import { useState } from "react";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Box,
//   Toolbar,
//   AppBar,
//   Typography,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";
// import { Menu as MenuIcon, Dashboard, People, Work, Home, Logout } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [open, setOpen] = useState(true);
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/signin"); // Redirect to login after logout
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
//     { text: "Customers", icon: <People />, path: "/admin/customers" },
//     { text: "Workers", icon: <Work />, path: "/admin/workers" },
//     { text: "Home", icon: <Home />, path: "/" },
//     { text: "Logout", icon: <Logout />, path: "/signin", action: handleLogout },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Admin Panel
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? open : true}
//         onClose={toggleDrawer}
//         sx={{
//           width: open ? 0 : isMobile ? 0 : 0,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 190 : isMobile ? 0 : 60,
//             transition: "width 0.3s",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//   {menuItems.map((item, index) => (
//     <ListItem
//       key={index}
//       component="div"
//       onClick={() => {
//         if (item.action) {
//           item.action(); // Call logout if action is defined
//         } else {
//           navigate(item.path);
//         }
//         if (isMobile) toggleDrawer(); // Close drawer on mobile
//       }}
//       selected={location.pathname === item.path}
//       sx={{
//         "&.Mui-selected": {
//           backgroundColor: "#1976d2",
//           color: "white",
//           "& .MuiListItemIcon-root": {
//             color: "white",
//           },
//         },
//         "&:hover": {
//           backgroundColor: "#eeeeee",
//         },
//         cursor: "pointer",
//         display: "flex",
//         justifyContent: open ? "flex-start" : "center", // Ensures proper alignment
//         padding: open ? "10px 16px" : "10px", // Adjust padding based on open state
//       }}
//     >
//       <ListItemIcon
//         sx={{
//           minWidth: open ? "40px" : "auto", // Ensures correct spacing for icon
//           justifyContent: "center", // Centers icons when sidebar is collapsed
//         }}
//       >
//         {item.icon}
//       </ListItemIcon>
//       {open && <ListItemText primary={item.text} sx={{ whiteSpace: "nowrap" }} />}
//     </ListItem>
//   ))}
// </List>


//       </Drawer>
//     </Box>
//   );
// };

// export default Sidebar;



import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  AppBar,
  Typography,
  useTheme,
} from "@mui/material";
import { Dashboard, People, Work, Home, Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Sidebar is always open
  const open = true;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Customers", icon: <People />, path: "/admin/customers" },
    { text: "Workers", icon: <Work />, path: "/admin/workers" },
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Logout", icon: <Logout />, path: "/signin", action: handleLogout },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Removed the IconButton to disable toggling */}
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 0 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 190 : 60,
            transition: "width 0.3s",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              component="div"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.path);
                }
              }}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: "#eeeeee",
                },
                cursor: "pointer",
                display: "flex",
                justifyContent: open ? "flex-start" : "center",
                padding: open ? "10px 16px" : "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: open ? "40px" : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} sx={{ whiteSpace: "nowrap" }} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
