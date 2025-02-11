import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Rating,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const UserProfileModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Button to open modal */}
      <Button variant="contained" onClick={handleOpen}>
        View Profile
      </Button>

      {/* Modal Component */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflow: "auto",
          }}
        >
          {/* Close Button */}
          <Button
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>

          {/* User Image with Verified Checkmark */}
          <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "grey.300",
                border: "3px solid green",
              }}
            />
            {/* Verified Badge - Only Checkmark */}
            <Box
              sx={{
                position: "absolute",
                bottom: 5,
                left: 220,
                backgroundColor: "green",
                color: "white",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                boxShadow: 2,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          <Typography variant="h6" fontWeight="bold" textAlign="center" mt={2}>
            John Doe
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            Plumbing Specialist
          </Typography>

          {/* Rating */}
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <Rating value={4.8} precision={0.1} readOnly />
            <Typography ml={1} fontWeight="bold">
              4.8
            </Typography>
          </Box>

          {/* Services Provided */}
          <Typography variant="subtitle1" mt={2}>
            Services Provided:
          </Typography>
          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            <Chip label="Pipe Repair" variant="outlined" />
            <Chip label="Drain Cleaning" variant="outlined" />
            <Chip label="Fixture Installation" variant="outlined" />
          </Box>

          {/* Scrollable Customer Comments */}
          <Typography variant="subtitle1" mt={2}>
            Customer Comments:
          </Typography>
          <Box
            sx={{
              mt: 1,
              maxHeight: 150,
              overflowY: "auto",
              p: 1,
            }}
          >
            {[
              { text: "Great service! Fixed my leaky faucet in no time.", author: "Alice" },
              { text: "Very professional and knowledgeable. Highly recommend!", author: "Bob" },
              { text: "Quick response and excellent work. Will hire again!", author: "Charlie" },
              { text: "Affordable and friendly. 5 stars!", author: "David" },
            ].map((comment, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  boxShadow: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body2">"{comment.text}"</Typography>
                <Typography variant="caption" color="text.secondary">
                  - {comment.author}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" startIcon={<ChatBubbleOutlineIcon />}>
              Contact
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserProfileModal;
