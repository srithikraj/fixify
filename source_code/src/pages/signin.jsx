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
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage= () => {
  const handleSubmit= () => console.log('Login')
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
          fullWidth required autoFocus 
          sx={{mb :2}}>
          </TextField>
          <TextField 
          placeholder="Enter password" 
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