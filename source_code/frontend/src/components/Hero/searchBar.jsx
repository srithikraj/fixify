import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, InputAdornment, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const searchSuggestions = [
  "Find a plumber",
  "Hire an electrician",
  "Book a cleaning service",
  "Get home repair help",
  "Find a handyman near you",
];

export default function SearchBar() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < searchSuggestions[currentIndex].length) {
        setDisplayText((prev) => prev + searchSuggestions[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayText("");
          setCharIndex(0);
          setCurrentIndex((prev) => (prev + 1) % searchSuggestions.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [charIndex, currentIndex]);

  // When user presses "Enter", navigate to the find service page.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate("/findService");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={displayText}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 30, color: "#1976d2" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 1200,
            bgcolor: "rgba(255, 255, 255, 0.2)", // More transparent
            borderRadius: "50px",
            backdropFilter: "blur(50px)", // Blurred glass effect
            "& .MuiOutlinedInput-root": {
              height: "60px",
              fontSize: "20px",
              paddingLeft: "20px",
              border: "none", // Remove border
              "& fieldset": { border: "none" }, // Remove outline
              "&:hover fieldset": { border: "none" }, // Remove hover effect
              "&.Mui-focused fieldset": { border: "none" }, // Remove focus effect
            },
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)", // Soft shadow effect
          }}
        />
      </Box>
    </Container>
  );
}
