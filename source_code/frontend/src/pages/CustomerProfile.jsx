// // export default CustomerProfile;
// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Container, Paper, Avatar, Typography, TextField, Button, Tabs, Tab, Box, Grid, IconButton, Modal } from "@mui/material";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import axios from "axios";

// const CustomerProfile = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const { isAuthenticated } = useContext(AuthContext);
  
//   const [formData, setFormData] = useState({ username: "", name: "", lastName: "", phone: "", email: "", address: { street: "", city: "", state: "", zip: "" } });
//   const [isEditing, setIsEditing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [openModal, setOpenModal] = useState(false);
//   const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

//   useEffect(() => {
//     if (user) {
//         console.log(user)
//       setFormData({
//         username: user.username || "",
//         name: user.first_name || "",
//         lastName: user.last_name || "",
//         phone: user.phone || "",
//         email: user.email || "",
//         addressln1: user.address.line1 || "",
//         province: user.address.province || "",
//         postalCode: user.address.postal_code || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = (e) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.put("http://localhost:3000/users/update", { username: user.username, ...formData });
//       if (response.data.success) {
//         setUser({ ...user, ...formData });
//         setIsEditing(false);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <Container maxWidth="xl" sx={{ marginTop: 5, display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//       <Box sx={{ display: "flex", width: "100%", maxWidth: "1200px", gap: 3 }}>
//         <Paper elevation={3} sx={{ padding: 3, width: "30%", textAlign: "center" }}>
//           <Box position="relative" display="inline-block">
//             <Avatar src="/profile.jpg" sx={{ width: 100, height: 100, margin: "auto" }} />
//             <IconButton sx={{ position: "absolute", bottom: 0, right: 10, bgcolor: "white" }}>
//               <PhotoCameraIcon color="primary" />
//             </IconButton>
//           </Box>
//           <Typography variant="h6" sx={{ marginTop: 1 }}>{formData.name} {formData.lastName}</Typography>
//           <Button variant="contained" sx={{ marginTop: 2 }}>View Public Profile</Button>
//         </Paper>

//         <Paper elevation={3} sx={{ padding: 3, flexGrow: 1 }}>
//           <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
//             <Tab label="Account" />
//           </Tabs>
//           {tabValue === 0 && (
//             <Box sx={{ marginTop: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal"  sx={{ textAlign: "center" }} disabled={true} />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="First Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" focused />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" focused  />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" focused  />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="Email Address" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal"  />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="Street Address" name="street" value={formData.addressln1} onChange={handleChange} fullWidth margin="normal" focused  />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="City" name="city" value="waterloo" onChange={handleChange} fullWidth margin="normal" focused  />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="State" name="state" value={formData.province} onChange={handleChange} fullWidth margin="normal" focused />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField label="ZIP Code" name="zip" value={formData.postalCode} onChange={handleChange} fullWidth margin="normal" focused />
//                 </Grid>
//               </Grid>
//               <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ mt: 2 }}>Update Password</Button>
//               <Modal open={openModal} onClose={() => setOpenModal(false)}>
//                 <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, width: "300px", margin: "auto", marginTop: "20vh" }}>
//                   <Typography variant="h6">Change Password</Typography>
//                   <TextField label="Current Password" name="currentPassword" type="password" fullWidth margin="normal" onChange={handlePasswordChange} />
//                   <TextField label="New Password" name="newPassword" type="password" fullWidth margin="normal" onChange={handlePasswordChange} />
//                   <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth margin="normal" onChange={handlePasswordChange} />
//                   <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>Submit</Button>
//                 </Box>
//               </Modal>
//             </Box>
//           )}
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default CustomerProfile;


import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Paper, Avatar, Typography, TextField, Button, Tabs, Tab, Box, Grid, IconButton, Modal } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";

const CustomerProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ 
    username: "", 
    name: "", 
    lastName: "", 
    phone: "", 
    email: "", 
    addressln1: "", 
    province: "", 
    postalCode: "" 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [passwords, setPasswords] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });

  useEffect(() => {
    if (user) {
      console.log(user)
      setFormData({
        username: user.username || "",
        name: user.first_name || "",
        lastName: user.last_name || "",
        phone: user.phone || "",
        email: user.email || "",
        addressln1: user.address.line1 || "",
        province: user.address.province || "",
        postalCode: user.address.postal_code || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:3000/users/update", { 
        username: user.username, 
        ...formData 
      });
      if (response.data.success) {
        setUser({ ...user, ...formData });
        setIsEditing(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5, display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ display: "flex", width: "100%", maxWidth: "1200px", gap: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, width: "30%", textAlign: "center" }}>
          <Box position="relative" display="inline-block">
            <Avatar src="/profile.jpg" sx={{ width: 100, height: 100, margin: "auto" }} />
            <IconButton sx={{ position: "absolute", bottom: 0, right: 10, bgcolor: "white" }}>
              <PhotoCameraIcon color="primary" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ marginTop: 1 }}>{formData.name} {formData.lastName}</Typography>
          <Button variant="contained" sx={{ marginTop: 2 }}>View Public Profile</Button>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, flexGrow: 1 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Account" />
          </Tabs>
          {tabValue === 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    label="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    sx={{ textAlign: "center" }} 
                    disabled={true} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="First Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Last Name" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Phone Number" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Email Address" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Street Address" 
                    name="addressln1" 
                    value={formData.addressln1} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Province" 
                    name="province" 
                    value={formData.province} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    label="Postal Code" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal" 
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                {isEditing ? (
                  <>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => setOpenModal(true)}
                >
                  Update Password
                </Button>
              </Box>
              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2, width: "300px", margin: "auto", marginTop: "20vh" }}>
                  <Typography variant="h6">Change Password</Typography>
                  <TextField 
                    label="Current Password" 
                    name="currentPassword" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    onChange={handlePasswordChange} 
                  />
                  <TextField 
                    label="New Password" 
                    name="newPassword" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    onChange={handlePasswordChange} 
                  />
                  <TextField 
                    label="Confirm Password" 
                    name="confirmPassword" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    onChange={handlePasswordChange} 
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }} 
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerProfile;