// import { 
//     Dialog, DialogTitle, DialogContent, DialogActions, 
//     Box, Avatar, Button, TextField, Typography, IconButton, Rating 
//   } from "@mui/material";
//   import CloseIcon from "@mui/icons-material/Close";
//   import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//   import { useState } from "react";
  
//   const WorkerContactModal = ({ open, handleClose, worker }) => {
//     const [message, setMessage] = useState("");
  
//     if (!worker) return null; // Prevent rendering if no worker is selected
  
//     const handleSendMessage = () => {
//       // Simulate sending message (replace with API call later)
//       console.log(`Sending message to ${worker.email}: ${message}`);
//       // Example API call: await axios.post("/api/send-message", { to: worker.email, message });
//       setMessage(""); // Clear message input
//       handleClose(); // Close modal
//     };
  
//     return (
//       <Dialog 
//         open={open} 
//         onClose={handleClose} 
//         maxWidth="sm" 
//         fullWidth 
//         sx={{ 
//           '& .MuiDialog-paper': { 
//             boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Light shadow
//             borderRadius: "12px", 
//             padding: "16px" 
//           } 
//         }}
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
//             <Typography variant="h6">Contact Worker</Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{ position: "absolute", right: 0, top: 0 }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
//             {/* Profile Picture */}
//             <Avatar 
//               src={worker.photo} 
//               alt={worker.name} 
//               sx={{ width: 100, height: 100, mb: 1 }} 
//             />
  
//             {/* Rating with Stars */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Rating 
//                 value={worker.rating} 
//                 readOnly 
//                 precision={0.5} 
//                 size="medium" 
//               />
//               <Typography variant="body2">({worker.rating}/5)</Typography>
//             </Box>
  
//             {/* Verified Checkmark */}
//             {worker.isVerified && (
//               <CheckCircleIcon sx={{ color: "green", fontSize: 24 }} />
//             )}
  
//             {/* Full Name */}
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               {worker.name}
//             </Typography>

//             <Typography variant="h8" sx={{ fontWeight: "bold" }}>
//               {worker.skills}
//             </Typography>
  
//             {/* Charge per Hour */}
//             <Typography variant="body1">
//               <strong>Charge:</strong> {worker.rate}
//             </Typography>

            
  
//             {/* Message Textarea */}
//             <TextField
//               label="Your Message"
//               multiline
//               rows={4}
//               fullWidth
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message here..."
//               sx={{ maxWidth: "400px", mt: 2 }}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center" }}>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             onClick={handleSendMessage}
//             disabled={!message.trim()} // Disable if message is empty
//           >
//             Send Message
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };
  
//   export default WorkerContactModal;

import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Box, Avatar, Button, TextField, Typography, IconButton, Rating, Chip 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const WorkerContactModal = ({ open, handleClose, worker }) => {
  const [message, setMessage] = useState("");

  if (!worker) return null; // Prevent rendering if no worker is selected

  const handleSendMessage = () => {
    // Simulate sending message (replace with API call later)
    console.log(`Sending message to ${worker.email}: ${message}`);
    // Example API call: await axios.post("/api/send-message", { to: worker.email, message });
    setMessage(""); // Clear message input
    handleClose(); // Close modal
  };

  // Map review comments to tags (simplified for demonstration)
  const reviewTags = worker.reviews?.reduce((tags, review) => {
    if (review.comment.toLowerCase().includes("efficient")) tags.push("Efficient & Quick");
    if (review.comment.toLowerCase().includes("friendly")) tags.push("Friendly");
    if (review.comment.toLowerCase().includes("communication")) tags.push("Good Communication");
    if (review.comment.toLowerCase().includes("quality")) tags.push("Good Quality");
    return tags;
  }, []) || [];

  // Removing duplicates and limit to unique tags
  const uniqueTags = [...new Set(reviewTags)].slice(0, 4); // Limit to 4 tags for layout

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth 
      sx={{ 
        '& .MuiDialog-paper': { 
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Light shadow
          borderRadius: "12px", 
          padding: "16px" 
        } 
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <Typography variant="h6">Contact Worker</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {/* Profile Picture */}
          <Avatar 
            src={worker.photo} 
            alt={worker.name} 
            sx={{ width: 100, height: 100, mb: 1 }} 
          />

          {/* Rating with Stars */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating 
              value={worker.rating} 
              readOnly 
              precision={0.5} 
              size="medium" 
            />
            <Typography variant="body2">({worker.rating}/5)</Typography>
          </Box>

          {/* Verified Checkmark */}
          {worker.isVerified && (
            <CheckCircleIcon sx={{ color: "green", fontSize: 24 }} />
          )}

          {/* Full Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {worker.name}
          </Typography>

          {/* Skills */}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {worker.skills}
          </Typography>

          {/* Charge per Hour */}
          <Typography variant="body1">
            <strong>Charge:</strong> {worker.rate}
          </Typography>

          {/* Reviews as Tags */}
          <Box sx={{ mt: 2, textAlign: "center", width: "100%" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
              {uniqueTags.length > 0 ? (
                uniqueTags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    sx={{ 
                      bgcolor: "#f5f5f5", 
                      color: "black", 
                      borderRadius: "16px", 
                      fontSize: "14px", 
                      padding: "4px 12px", 
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
                    }}
                  />
                ))
              ) : (
                <Typography variant="body2">No reviews yet.</Typography>
              )}
            </Box>
          </Box>

          {/* Message Textarea */}
          <TextField
            label="Your Message"
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            sx={{ maxWidth: "400px", mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSendMessage}
          disabled={!message.trim()} // Disable if message is empty
        >
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkerContactModal;