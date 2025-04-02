// import { 
//   Dialog, DialogTitle, DialogContent, DialogActions, 
//   Box, Avatar, Button, TextField, Typography, IconButton, Rating, Chip, Divider 
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { useState, useContext } from "react";
// import { AuthContext} from "../../context/AuthContext";

// const WorkerContactModal = ({ open, handleClose, worker }) => {
//   const [message, setMessage] = useState("");
//   const [reviewRating, setReviewRating] = useState(0);
//   const [reviewComment, setReviewComment] = useState("");
//   const { isAuthenticated } = useContext(AuthContext);
  

//   if (!worker) return null; // Prevent rendering if no worker is selected

//   const handleSendMessage = () => {
//     // Simulate sending message (replace with API call later)
//     console.log(`Sending message to ${worker.email}: ${message}`);
//     setMessage(""); // Clear message input
//     handleClose(); // Close modal
//   };

//   const handleSubmitReview = () => {
//     // Simulate submitting review (replace with API call later)
//     console.log(`Submitting review for ${worker.name}: Rating: ${reviewRating}, Comment: ${reviewComment}`);
//     // Reset review fields after submission
//     setReviewRating(0);
//     setReviewComment("");
//   };

//   // Map review comments to tags (simplified for demonstration)
//   const reviewTags = worker.reviews?.reduce((tags, review) => {
//     if (review.comment.toLowerCase().includes("efficient")) tags.push("Efficient & Quick");
//     if (review.comment.toLowerCase().includes("friendly")) tags.push("Friendly");
//     if (review.comment.toLowerCase().includes("communication")) tags.push("Good Communication");
//     if (review.comment.toLowerCase().includes("quality")) tags.push("Good Quality");
//     return tags;
//   }, []) || [];

//   // Remove duplicates and limit to unique tags
//   const uniqueTags = [...new Set(reviewTags)].slice(0, 4);

//   return (
//     <Dialog 
//       open={open} 
//       onClose={handleClose} 
//       maxWidth="sm" 
//       fullWidth 
//       sx={{ 
//         '& .MuiDialog-paper': { 
//           boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
//           borderRadius: "12px", 
//           padding: "16px" 
//         } 
//       }}
//     >
//       <DialogTitle>
//         <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
//           <Typography variant="h6">Contact Worker</Typography>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ position: "absolute", right: 0, top: 0 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
//           {/* Profile Picture */}
//           <Avatar 
//             src={worker.photo} 
//             alt={worker.name} 
//             sx={{ width: 100, height: 100, mb: 1 }} 
//           />

//           {/* Worker Rating */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Rating 
//               value={worker.rating} 
//               readOnly 
//               precision={0.5} 
//               size="medium" 
//             />
//             <Typography variant="body2">({worker.rating}/5)</Typography>
//           </Box>

//           {/* Verified Checkmark */}
//           {worker.isVerified && (
//             <CheckCircleIcon sx={{ color: "green", fontSize: 24 }} />
//           )}

//           {/* Worker Name */}
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             {worker.name}
//           </Typography>

//           {/* Worker Skills */}
//           <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//             {worker.skills}
//           </Typography>

//           {/* Worker Rate */}
//           <Typography variant="body1">
//             <strong>Charge:</strong> {worker.rate}
//           </Typography>

//           {/* Reviews as Tags */}
//           <Box sx={{ mt: 2, textAlign: "center", width: "100%" }}>
//             <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
//               {uniqueTags.length > 0 ? (
//                 uniqueTags.map((tag, index) => (
//                   <Chip 
//                     key={index} 
//                     label={tag} 
//                     sx={{ 
//                       bgcolor: "#f5f5f5", 
//                       color: "black", 
//                       borderRadius: "16px", 
//                       fontSize: "14px", 
//                       padding: "4px 12px", 
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
//                     }}
//                   />
//                 ))
//               ) : (
//                 <Typography variant="body2">No reviews yet.</Typography>
//               )}
//             </Box>
//           </Box>

//           <Divider sx={{ width: "100%", my: 2 }} />

//           {/* Review Section */}
//           {isAuthenticated ? (
//               <Box sx={{ width: "100%" }}>
//               <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
//                 Leave a Review
//               </Typography>
//               <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
//                 <Rating 
//                   name="worker-review-rating"
//                   value={reviewRating}
//                   precision={0.5}
//                   onChange={(event, newValue) => {
//                     setReviewRating(newValue);
//                   }}
//                 />
//               </Box>
//               <TextField
//                 label="Optional review comment"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={reviewComment}
//                 onChange={(e) => setReviewComment(e.target.value)}
//                 placeholder="Write your review here..."
//               />
//             </Box>
//       ) : (
//         <p>🔒 Please log in to write a review </p>
//       )}

//         </Box>
//       </DialogContent>

//       { isAuthenticated ? ( 
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
//       ) : (
//         <p></p>
//       )}
//     </Dialog>
//   );
// };

// export default WorkerContactModal;


import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Box, Avatar, Button, TextField, Typography, IconButton, Rating, Chip, Divider 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const WorkerContactModal = ({ open, handleClose, worker, onReviewSubmit }) => {
  console.log("WorkerContactModal worker:", worker);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const { isAuthenticated, user } = useContext(AuthContext);
  
  if (!worker) return null; // Prevent rendering if no worker is selected

  const handleSubmitReview = async () => {
    // Create review data from form inputs
    const reviewData = {
      consumer: user.id,        // Current logged-in user's id
      provider: worker._id,       // Worker id (or use worker.id if that's your identifier)
      description: reviewComment,
      rating: reviewRating,
    };

    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally include auth token here if needed:
          // 'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log("Review submitted successfully");
        // Optionally update parent component via a callback:
        if (onReviewSubmit) {
          onReviewSubmit(worker._id, reviewData);
        }
        // Reset review fields after submission
        setReviewRating(0);
        setReviewComment("");
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };
  const getNameString = (firstName, lastName) => {
    if (!firstName || !lastName) {
      return "Unknown";
    }
    return `${firstName} ${lastName}`;
  };

  // Map review comments to tags (simplified for demonstration)
  const reviewTags = worker.reviews?.reduce((tags, review) => {
    if (review.description.toLowerCase().includes("efficient")) tags.push("Efficient & Quick");
    if (review.description.toLowerCase().includes("friendly")) tags.push("Friendly");
    if (review.description.toLowerCase().includes("communication")) tags.push("Good Communication");
    if (review.description.toLowerCase().includes("quality")) tags.push("Good Quality");
    return tags;
  }, []) || [];

  // Remove duplicates and limit to unique tags
  const uniqueTags = [...new Set(reviewTags)].slice(0, 4);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth 
      sx={{ 
        '& .MuiDialog-paper': { 
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
          borderRadius: "12px", 
          padding: "16px" 
        } 
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <Typography variant="h6">Leave a Review</Typography>
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
          <h3>{getNameString(worker.userDetails.first_name, worker.userDetails.last_name)}</h3>

          {/* Worker Rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating 
              value={worker.ratings} 
              readOnly 
              precision={0.5} 
              size="medium" 
            />
            {/* <Typography variant="body2">({worker.rating}/5)</Typography> */}
          </Box>

          {/* Verified Checkmark */}
          {worker.isVerified && (
            <CheckCircleIcon sx={{ color: "green", fontSize: 24 }} />
          )}

          {/* Worker Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {worker.name}
          </Typography>

          {/* Worker Skills */}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {worker.skills}
          </Typography>

          {/* Worker Rate */}
          <Typography variant="body1">
            <strong>Service Fee:</strong> {"$" + worker.rate}
          </Typography>

          {/* Reviews as Tags */}
          {/* <Box sx={{ mt: 2, textAlign: "center", width: "100%" }}>
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
          </Box> */}

          <Divider sx={{ width: "100%", my: 2 }} />

          {/* Review Section */}
          {isAuthenticated ? (
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                Your Review
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <Rating 
                  name="worker-review-rating"
                  value={reviewRating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setReviewRating(newValue);
                  }}
                />
              </Box>
              <TextField
                label="Review"
                multiline
                rows={3}
                fullWidth
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write your review here..."
              />
            </Box>
          ) : (
            <Typography variant="body2">🔒 Please log in to write a review</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {isAuthenticated && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmitReview}
            disabled={reviewRating === 0 && !reviewComment.trim()} 
          >
            Submit Review
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default WorkerContactModal;
