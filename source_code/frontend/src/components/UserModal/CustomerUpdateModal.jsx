import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Box, Avatar, Button, TextField, Typography, IconButton 
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState } from "react";
  
  const CustomerUpdateModal = ({ open, handleClose, customer }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    console.log("Customer:", customer);
  
    if (!customer) return null; // Prevent rendering if no customer is selected
  
    const handleDeleteClick = () => {
      setDeleteDialogOpen(true);
    };
  
    // const handleConfirmDelete = () => {
    //   // Perform account deletion (API Call or State Update)
      // setDeleteDialogOpen(false);
      // handleClose(); // Closing both modals
    // };

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${customerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }
      const result = await response.json();
      console.log(result.message);
      setDeleteDialogOpen(false);
      handleClose(); // Closing both modals
      // Optionally, notify the parent component that the customer has been deleted
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  
    return (
      <>
        {/* Customer Edit Modal */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            Edit Customer
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", right: 10, top: 10 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              
              {/* Avatar Upload */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 80, height: 80 }} />
                <Box>
                  <Button variant="contained" component="label">Upload Photo</Button>
                  <Button variant="text">Remove Photo</Button>
                </Box>
              </Box>
  
              {/* Full Name & Email */}
              <TextField label="Full Name" fullWidth defaultValue={customer.name} />
              <TextField label="Email" fullWidth defaultValue={customer.email} />
  
              {/* Phone & Address */}
              <TextField label="Phone" fullWidth defaultValue={customer.phone} />
              <TextField label="Address" fullWidth defaultValue={customer.address.line1 + " " + customer.address.city + " " + customer.address.province + " " + customer.address.postal_code } />
    
              {/* Delete Account Section */}
              <Typography color="error">
                Deleting this account will remove all customer data. This action cannot be undone.
              </Typography>
              <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                Delete Account
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" color="primary">Save Changes</Button>
          </DialogActions>
        </Dialog>
  
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this customer? This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleDelete(customer._id)}
              >
                Yes, Delete
              </Button>
            </DialogActions>
      </Dialog>
      </>
    );
  };
  
  export default CustomerUpdateModal;
  