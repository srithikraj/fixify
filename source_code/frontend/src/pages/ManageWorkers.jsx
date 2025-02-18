import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";

const workers = [
  { name: "John Doe", email: "john@example.com", service: "Plumbing", rating: 4.5 },
  { name: "Jane Smith", email: "jane@example.com", service: "Electrical", rating: 4.8 },
  { name: "Bob Johnson", email: "bob@example.com", service: "Carpentry", rating: 4.2 },
  { name: "Alice Brown", email: "alice@example.com", service: "Painting", rating: 4.6 },
  { name: "Charlie Davis", email: "charlie@example.com", service: "Gardening", rating: 4.7 }
];

const ManageWorkers = () => {
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
                  <Button variant="outlined" color="primary" sx={{ mr: 1 }}>View</Button>
                  <Button variant="contained" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageWorkers;
