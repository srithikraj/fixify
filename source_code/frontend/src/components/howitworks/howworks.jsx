import React from "react";
import { Container, Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventIcon from "@mui/icons-material/Event";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const steps = [
  {
    icon: <ArrowForwardIcon fontSize="large" />, 
    title: "Search Services", 
    description: "Browse through a wide range of home services and find the one you need."
  },
  {
    icon: <EventIcon fontSize="large" />, 
    title: "Book an Appointment", 
    description: "Choose a convenient time and book your service directly with the service provider."
  },
  {
    icon: <StarBorderIcon fontSize="large" />, 
    title: "Enjoy Quality Service", 
    description: "Sit back and relax as our skilled professionals take care of your needs."
  }
];

const HowItWorks = () => {
  return (
    <Container id="howitworks" sx={{ textAlign: "center", py: 15}}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        How Fixify Works
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card elevation={0} sx={{ textAlign: "center", p: 2 }}>
              <Avatar sx={{ bgcolor: "black", "&:hover": { color: "#03a9f4" }, width: 60, height: 60, mx: "auto", mb: 2 }}>
                {step.icon}
              </Avatar>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;

