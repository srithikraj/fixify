import React from "react";
import { Avatar, Checkbox, FormControlLabel, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left side welcome panel */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          backgroundImage: "linear-gradient(to right, #1e3c72, #2a5298)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: 4,
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box component="img" src="/src/pages/WelcomeBack.jpg" alt="Welcome Image" sx={{ width: "60%", mb: 2 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Nice to see you again! Enter your credentials to access your account.
          </Typography>
        </Box>
      </Grid>
      
      {/* Right side login panel */}
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={6} 
        component={Paper} 
        elevation={6} 
        square
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ mt: 2, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
            >
              SIGN IN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
