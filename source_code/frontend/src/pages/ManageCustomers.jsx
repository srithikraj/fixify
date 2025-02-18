import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";

const customers = [
  { name: "Emma Wilson", email: "emma@example.com", bookings: 5 },
  { name: "Liam Anderson", email: "liam@example.com", bookings: 3 },
  { name: "Olivia Taylor", email: "olivia@example.com", bookings: 7 },
  { name: "Noah Martinez", email: "noah@example.com", bookings: 2 },
  { name: "Ava Johnson", email: "ava@example.com", bookings: 4 }
];

const ManageCustomers = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" fontWeight="bold">Manage Customers</Typography>
      <TextField fullWidth label="Search customers..." sx={{ my: 2 }} />
      
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Bookings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.bookings}</TableCell>
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

export default ManageCustomers;
