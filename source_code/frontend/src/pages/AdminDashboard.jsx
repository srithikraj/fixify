import React from 'react'; 
import { useState } from "react";
import { 
  Box, Typography, Grid, Paper, Toolbar, Card, CardContent 
} from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from '@mui/icons-material/StarRate';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const userData = [
    { name: "Jan", users: 20 },
    { name: "Feb", users: 40 },
    { name: "Mar", users: 70 },
    { name: "Apr", users: 50 },
    { name: "May", users: 80 },
    { name: "Jun", users: 100 },
    { name: "Jul", users: 90 },
    { name: "Aug", users: 110 },
    { name: "Sep", users: 60 }
  ];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
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
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Overview of customers, workers, and performance analytics.
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <PersonIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                <Typography variant="h6">Total Customers</Typography>
                <Typography variant="h4" fontWeight="bold">120</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <BuildIcon sx={{ fontSize: 40, color: "#28A745" }} />
                <Typography variant="h6">Total Workers</Typography>
                <Typography variant="h4" fontWeight="bold">50</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <StarRateIcon sx={{ fontSize: 40, color: "#FFC107" }} />
                <Typography variant="h6">Total Reviews</Typography>
                <Typography variant="h4" fontWeight="bold">690</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: "#FF5733" }} />
                <Typography variant="h6">Growth Rate</Typography>
                <Typography variant="h4" fontWeight="bold">78%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Website Analytics</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userData} data-testid="recharts-bar-chart">
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#1976D2" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Typography sx={{ mt: 2 }}>🔵 5 new customers signed up</Typography>
              <Typography sx={{ mt: 1 }}>🟢 3 new workers registered</Typography>
              <Typography sx={{ mt: 1 }}>🔴 1 worker deactivated</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
