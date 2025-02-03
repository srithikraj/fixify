import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const ReadyToGetStarted = () => {
  return (
    <Box sx={{ textAlign: "center", py: 20, backgroundColor: "#f5f5f5", borderRadius: 2, width: "100%" }}> {/* Full width section */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Ready to Get Started with Fixify?
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Find the perfect service provider for your home needs today.
      </Typography>
      <Box>
        <Button variant="contained" sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}>
          Explore Services
        </Button>
      </Box>
    </Box>
  );
};

export default ReadyToGetStarted;
