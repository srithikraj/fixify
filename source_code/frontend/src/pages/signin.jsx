// import React from 'react'
// import { Container,Paper } from '@mui/system'


// function signin() {
//   return (
//     <div>signin</div>
//   )
// }

// export default signin

import { Avatar, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { verifyUser } from '../api/userApi'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage= () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    let response = await verifyUser(user)
    if( response.success )
    {
      sessionStorage.setItem("token", response.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
      console.log(response)
      navigate("/")
    } else {
      alert(response.message)
    }
   
  }
  
  return(
    <Container maxWidth="xs">
      <Paper elevation={10} sx={ {marginTop:8,padding:2}}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor:"secondary main",
            textAlign:"center",
            mb:1,
            
          }}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
          Sign In
        </Typography>
        <Box component="form" 
          onSubmit={handleSubmit}
          noValidate
          sx={{mt:1}}
        >
          <TextField 
          placeholder="Enter username" 
          onChange={handleChange}
          name="username"
          fullWidth required autoFocus 
          sx={{mb :2}}>
          </TextField>
          <TextField 
          placeholder="Enter password" 
          name="password"
          onChange={handleChange}
          fullWidth 
          required 
          type="password">
          </TextField>
          <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
          label="Remember me">
          </FormControlLabel>   
          <Button type="submit" variant    ="contained" fullWidth sx={{mt:1}}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>

  );
}

export default LoginPage;