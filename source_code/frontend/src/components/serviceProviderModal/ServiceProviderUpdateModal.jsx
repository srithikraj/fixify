import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Box, Avatar, Button, TextField, Typography, IconButton, 
  Select, MenuItem 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const ServiceProviderUpdateModal = ({ open, handleClose, worker }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  console.log(worker);

  if (!worker) return null;

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform the delete action here (e.g., API call to delete account)
    setDeleteDialogOpen(false);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Profile
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
            <TextField label="Full Name" fullWidth value={worker.userDetails.first_name + " " + worker.userDetails.last_name} />

            {/* Company & Position */}
            <TextField label="Phone" fullWidth value="(123)-345-3434" disabled />
            <TextField label="Services Provided" fullWidth value={worker.services} />
            <TextField label="Address" fullWidth value={worker.userDetails.address.line1 + " " + worker.userDetails.address.postal_code} disabled/>

            {/* Account Details */}
            <Typography variant="h6">Account Details</Typography>
            <TextField label="Log in email address" fullWidth value={worker.userDetails.email} disabled />
            <TextField label="Password" fullWidth type="password" value="*********" />

            {/* Delete Account */}
            <Typography color="error">
              Deleting your account will remove all access. This action cannot be undone.
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
            Are you sure you want to delete this account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions >
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServiceProviderUpdateModal;
