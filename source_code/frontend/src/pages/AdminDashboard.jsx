// import { Box, Typography, Grid, Paper } from "@mui/material";
// import Sidebar from "../components/Sidebar/Sidebar";

// const AdminDashboard = () => {
//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Sidebar/>
//       <Typography variant="h4" fontWeight="bold">Welcome to Admin Dashboard</Typography>
//       <Typography variant="body1">Overview of customers and workers.</Typography>

//       <Grid container spacing={3} sx={{ mt: 3 }}>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6">Total Customers: 120</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6">Total Workers: 50</Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AdminDashboard;

import { useState } from "react";
import { Box, Typography, Grid, Paper, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s",
          marginLeft: open ? "50px" : "60px",
        }}
      >
        <Toolbar />
        <Typography variant="h4" fontWeight="bold">
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="body1">Overview of customers and workers.</Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Customers: 120</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Workers: 50</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

