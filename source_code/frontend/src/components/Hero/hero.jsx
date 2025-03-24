import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SearchBar from "./searchBar";
import carpenter from "../../assets/carpenter.jpg";
import electrician from "../../assets/electrician.jpg";
import plumber from "../../assets/plumbing.jpg";
import painter from "../../assets/painter.jpg";
import metalGrinder from "../../assets/metalGrinder.jpg";
import welding from "../../assets/welding.jpg";

const images = [
  electrician,
  metalGrinder,
  welding,
  plumber,
  carpenter,
  painter
];



export default function Hero() {
  return (
    <Box id="hero" sx={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Image Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={2200}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Overlay Content (No Extra Padding) */}
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          zIndex: 2,
          width: "100%",
        }}
      >
        <Typography style={{ color: "#FFFFFF" }} variant="h3" fontWeight="bold" gutterBottom>
          From Leaks to Lights –{" "}
          <span style={{ color: "#1769aa", fontWeight: "bold" }}>Fixify</span> Has You Covered!
        </Typography>
        <Typography variant="h6" gutterBottom>
          We provide the best home services with expert professionals.
        </Typography>
        <SearchBar />
        {/* <Button variant="contained" color="primary" size="large">
          Get Started
        </Button> */}
      </Box>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        }}
      />
    </Box>
  );
}
