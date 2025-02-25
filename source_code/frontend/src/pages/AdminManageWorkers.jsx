import { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField
} from "@mui/material";
import ServiceProviderUpdateModal from "../components/serviceProviderModal/ServiceProviderUpdateModal"; // Import the modal component
const workers = [
  { name: "John Doe", email: "john@example.com", service: "Plumbing", rating: 4.5 },
  { name: "Jane Smith", email: "jane@example.com", service: "Electrical", rating: 4.8 },
  { name: "Bob Johnson", email: "bob@example.com", service: "Carpentry", rating: 4.2 },
  { name: "Alice Brown", email: "alice@example.com", service: "Painting", rating: 4.6 },
  { name: "Charlie Davis", email: "charlie@example.com", service: "Gardening", rating: 4.7 }
];

const ManageWorkers = () => {
  const [open, setOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleOpen = (worker) => {
    setSelectedWorker(worker);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWorker(null);
  };
  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/serviceProviders", {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data fetched:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" fontWeight="bold">Manage Workers</Typography>
      <TextField fullWidth label="Search workers..." sx={{ my: 2 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker, index) => (
              <TableRow key={index}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.email}</TableCell>
                <TableCell>{worker.service}</TableCell>
                <TableCell>{worker.rating}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpen(worker)}
                  >
                    View
                  </Button>
                  <Button variant="contained" color="success">Verify</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Worker Profile Modal */}
      <ServiceProviderUpdateModal open={open} handleClose={handleClose} worker={selectedWorker} />
    </Box>
  );
};

export default ManageWorkers;
