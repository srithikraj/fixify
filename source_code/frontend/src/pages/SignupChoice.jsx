import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button, IconButton } from "@mui/material";
import { FaUser, FaBriefcase } from "react-icons/fa";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupChoice = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <Box
      id="box1"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #b3e0ff, #f3c6ff)",
        flexDirection: "column",
      }}
    >
      {/* Go Back Button */}
      <IconButton
        id="iconbutton"
        sx={{ position: "absolute", top: 20, left: 20, color: "#1976D2" }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        id="box2"
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Choose how you'd like to be part of our platform:
        </Typography>

        {/* Selection Cards */}
        <Box id="selectioncard" sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
          {/* Customer Card */}
          <Card
            id="customercard"
            sx={{
              width: 180,
              border: selected === "customer" ? "2px solid #1976D2" : "2px solid transparent",
              boxShadow: selected === "customer" ? "0px 0px 8px rgba(25, 118, 210, 0.4)" : 1,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: "0px 0px 10px rgba(25, 118, 210, 0.5)" },
            }}
            onClick={() => setSelected("customer")}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <FaUser size={40} color="#1976D2" />
              <Typography variant="h6" fontWeight="bold" color="primary" mt={1}>
                Customer
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Find services and get things done
              </Typography>
            </CardContent>
          </Card>

          {/* Worker Card */}
          <Card
            id="workercard"
            sx={{
              width: 180,
              border: selected === "worker" ? "2px solid #E91E63" : "2px solid transparent",
              boxShadow: selected === "worker" ? "0px 0px 8px rgba(233, 30, 99, 0.4)" : 1,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: "0px 0px 10px rgba(233, 30, 99, 0.5)" },
            }}
            onClick={() => setSelected("worker")}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <FaBriefcase size={40} color="#E91E63" />
              <Typography variant="h6" fontWeight="bold" color="secondary" mt={1}>
                Worker
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Offer your skills and earn money
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Continue Button */}
        <Button
          id="continuebutton"
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 4 }}
          disabled={!selected}
          onClick={() => navigate(selected === "customer" ? "/create-account" : "/service-provider")}
        >
          Continue
        </Button>

        {/* Login Link */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#1976D2",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/signin")}
          >
            Log in here
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupChoice;
