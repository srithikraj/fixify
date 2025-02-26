import React, { useEffect, useState } from "react";
import Footer from '../components/Footer/footer';
import Hero from '../components/Hero/hero';
import HowItWorks from '../components/howitworks/howworks';
import Navbar from '../components/Navbar/Navbar';
import ReadyToGetStarted from '../components/getstarted/getstarted';
import ServicesSection from '../components/serviceSection/serviceSection';
import WorkerManagementForm from "./serviceProviderLogin";
import ReviewCard from "../components/reviewcard/ReviewCard";
import { getTopReviews } from "../api/reviewApi";
import { Grid, Container, Typography } from "@mui/material";



function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await getTopReviews();
      if (data) {
        setReviews(data.slice(0, 5)); // Only keep top 5 reviews
      }
    }
    fetchReviews();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <ServicesSection />

      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ⭐ Customer Reviews ⭐
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {reviews.map((review, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>


      <ReadyToGetStarted />
      <Footer />
    </>
  );
}

export default Home;