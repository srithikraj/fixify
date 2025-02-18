import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Grid, InputLabel, List, ListItem, ListItemText, Typography, Avatar, Card, CardContent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const WorkerManagementForm = () => {
  const [worker, setWorker] = useState({
    name: "",
    email: "",
    phone: "",
    skill: "",
    schedule: {},
    hourlyRate: "",
    profilePicture: null,
    profilePictureName: "",
    reviews: [],
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews?workerEmail=" + worker.email);
        const data = await response.json();
        setWorker((prev) => ({ ...prev, reviews: data.reviews }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (worker.email) {
      fetchReviews();
    }
  }, [worker.email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorker({ ...worker, [name]: value });
  };

  const handleDateChange = (day, newValue) => {
    setWorker((prev) => ({
      ...prev,
      schedule: { ...prev.schedule, [day]: newValue },
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWorker({ ...worker, profilePicture: URL.createObjectURL(file), profilePictureName: file.name });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Worker Details:", worker);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px", padding: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Fixer's Profile
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              {worker.profilePicture && <Avatar src={worker.profilePicture} sx={{ width: 100, height: 100 }} />}
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Profile Picture</InputLabel>
              <input type="file" onChange={handleFileChange} accept="image/*" fullWidth />
              {worker.profilePictureName && <Typography variant="body2">Selected: {worker.profilePictureName}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" name="name" value={worker.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" type="email" value={worker.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" name="phone" type="tel" value={worker.phone} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Skill" name="skill" value={worker.skill} onChange={handleChange} required />
            </Grid>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <Grid item xs={12} key={day}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label={`${day} Schedule`}
                    value={worker.schedule[day] || null}
                    onChange={(newValue) => handleDateChange(day, newValue)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField fullWidth label="Hourly Rate" name="hourlyRate" type="number" value={worker.hourlyRate} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkerManagementForm;
