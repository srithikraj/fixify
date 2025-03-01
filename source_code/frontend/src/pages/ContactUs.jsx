import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = "service_rdl10r9";  // Your EmailJS Service ID
    const templateID = "template_yjwfdkf"; // Your EmailJS Template ID
    const publicKey = "rDD9O4qnzpJcywjWg"; // Your EmailJS Public Key

    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.phone,
      location: formData.location,
      service: formData.service,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        alert("Email sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          service: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please check console for errors.");
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, backgroundColor: "#e3f2fd", p: 3, borderRadius: 2, boxShadow: 3 }}>

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "center", color: "#ff5722" }}>
        Connect with Our <span style={{ color: "#4caf50" }}>Team of Experts</span>
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom sx={{ textAlign: "center" }}>
        Contact us for expert help – we're just a call away!
      </Typography>
      
      <Grid container justifyContent="center"  spacing={3} mt={3}>
        
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, backgroundColor: "#1a237e", color: "white", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <form onSubmit={sendEmail}>
                <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required sx={{ backgroundColor: "white", borderRadius: 1, mb: 1 }} />
                <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} required sx={{ backgroundColor: "white", borderRadius: 1, mb: 1 }} />
                <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{ backgroundColor: "white", borderRadius: 1, mb: 1 }} />
                <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} sx={{ backgroundColor: "white", borderRadius: 1, mb: 1 }} />
                <TextField fullWidth label="Tell Us About Your Problem" name="message" value={formData.message} onChange={handleChange} multiline rows={4} required sx={{ backgroundColor: "white", borderRadius: 1, mb: 2 }} />
                <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: "#ff5722", '&:hover': { backgroundColor: "#e64a19" } }}>Submit</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h6" fontWeight="bold" mt={5} sx={{ textAlign: "center", color: "#673ab7" }}>Contact Information</Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>📞 Phone: +1 (123) 456-7890</Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>📍 Address: 123 Business St, City, Country</Typography>
    </Container>
  );
};

export default ContactUs;