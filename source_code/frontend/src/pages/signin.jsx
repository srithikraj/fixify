// import React from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useContext, useEffect, useState } from 'react';
// import { Avatar, Checkbox, FormControlLabel, Paper, Typography, TextField, Button, Grid } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { useNavigate } from 'react-router-dom';
// import { verifyUser } from '../api/userApi'
// import axios from "axios";


// const LoginPage = () => {

//   const navigate = useNavigate();
//   const { isAuthenticated, login } = useContext(AuthContext);

//   const [user, setUser] = useState({
//     username: "",
//     password: ""
//   })

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/")
//     }
//   }, [isAuthenticated, navigate])

//   function handleChange(e) {
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()
//     console.log(user)
//     let response = await verifyUser(user)
//     if (response.success) {
//       sessionStorage.setItem("token", response.token)
//       axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
//       login(response.token, response.user);
//       console.log(response)
//       navigate("/")
//     }
//     else if (response.message.includes("not verified")) {
//       const { userId } = response;
//         setError("Your email is not verified. A new OTP has been sent. Redirecting...");
//         setTimeout(() => {
//           navigate("/verify-customer", {
//             state: { userId, email: user.username }, // Assuming username is email
//           });
//         }, 2000); // 2-second delay to show message
//     }
//      else {
//       alert(response.message)
//     }

//   }

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       {/* Left side welcome panel */}
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={6}
//         sx={{
//           // backgroundImage: "linear-gradient(to right, #1e3c72, #2a5298)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white",
//           textAlign: "center",
//           padding: 4,
//           flexDirection: "column",
//           height: "100%",
//           background: "linear-gradient(to bottom right, #7e57c2, #000)",
//         }}
//       >
//         <Box component="img" src="/src/pages/WelcomeBack.jpg" alt="Welcome Image" sx={{ width: "60%", mb: 2 }} />
//         <Box>
//           <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//             Welcome Back!
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 2 }}>
//             Nice to see you again! Enter your credentials to access your account.
//           </Typography>
//         </Box>
//       </Grid>

//       {/* Right side login panel */}
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={6}
//         component={Paper}
//         elevation={6}
//         square
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           height: "100%",
//         }}
//       >
//         <Container maxWidth="xs">
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ mt: 2, fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
//             >
//               Login to Your Account
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
//               <TextField
//                 placeholder="Enter username"
//                 onChange={handleChange}
//                 name="username"
//                 fullWidth required autoFocus
//                 sx={{ mb: 2 }}>
//               </TextField>
//               <TextField
//                 placeholder="Enter password"
//                 name="password"
//                 onChange={handleChange}
//                 fullWidth required autoFocus
//                 type="password">
//               </TextField>
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#ef4444", color: "white" }}>
//                 Login
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };

// export default LoginPage;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Checkbox, FormControlLabel, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { verifyUser } from "../api/userApi";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await verifyUser(user);
      console.log("Login response:", response);

      if (response.success) {
        sessionStorage.setItem("token", response.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
        login(response.token, response.user);
        navigate("/");
      } else {
        setError(response.message); // e.g., "User not found" or "Incorrect password"
      }
    } catch (error) {
      console.error("Login error:", error);
      const responseData = error.response?.data;
      if (error.response?.status === 403 && responseData?.message.includes("not verified")) {
        setError("Your email is not verified. A new OTP has been sent. Redirecting...");
        const { userId } = responseData;
        setTimeout(() => {
          navigate("/verify-customer", {
            state: { userId, email: user.username }, // Assuming username is email
          });
        }, 2000);
      } else {
        setError(responseData?.message || "Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: 4,
          flexDirection: "column",
          height: "100%",
          background: "linear-gradient(to bottom right, #7e57c2, #000)",
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
              Login to Your Account
            </Typography>
            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <TextField
                placeholder="Enter username"
                onChange={handleChange}
                name="username"
                value={user.username}
                fullWidth
                required
                autoFocus
                sx={{ mb: 2 }}
              />
              <TextField
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                value={user.password}
                fullWidth
                required
                type="password"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2, backgroundColor: "#ef4444", "&:hover": { backgroundColor: "#c62828" } }}
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;