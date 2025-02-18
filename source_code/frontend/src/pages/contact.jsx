import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";

const ContactUs = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <Container maxWidth="md" sx={{ mt: 5, backgroundColor: "#e3f2fd", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "center", color: "#ff5722" }}>
        Connect with Our <span style={{ color: "#4caf50" }}>Team of Experts</span>
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom sx={{ textAlign: "center" }}>
        Contact us for expert help – we're just a call away!
      </Typography>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">Want to Join Our Talented Team?</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Visit our job board.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: "#4caf50", '&:hover': { backgroundColor: "#388e3c" } }}
                onClick={() => navigate("/jobs")}
              >
                Visit Job Board
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, backgroundColor: "#1a237e", color: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <TextField fullWidth label="Full Name" variant="outlined" margin="dense" required sx={{ backgroundColor: "white", borderRadius: 1 }} />
              <TextField fullWidth label="Email Address" variant="outlined" margin="dense" required sx={{ backgroundColor: "white", borderRadius: 1 }} />
              <TextField fullWidth label="Phone Number" variant="outlined" margin="dense" sx={{ backgroundColor: "white", borderRadius: 1 }} />
              <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#ff5722", '&:hover': { backgroundColor: "#e64a19" } }}>
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mt={5} sx={{ textAlign: "center", color: "#673ab7" }}>
        Contact Information
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>📞 Phone: +1 (123) 456-7890</Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>📍 Address: 123 Business St, City, Country</Typography>
    </Container>
  );
};

export default ContactUs;
