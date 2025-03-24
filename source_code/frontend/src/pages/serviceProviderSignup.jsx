import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const skillsList = [
  "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "HVAC Repair", "Gardening",
  "Pest Control", "Roofing", "Masonry", "Appliance Repair", "Flooring", "Locksmith",
  "Window Cleaning", "Handyman", "Drywall Repair", "Tile Work", "Furniture Assembly",
  "Pressure Washing", "Pool Maintenance",
];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = ["Morning", "Afternoon", "Evening"];
const provinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon",
];

const ServiceProviderSignup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "provider",
    bio: "",
    skills: [],
    hourlyRate: "",
    serviceDescription: "",
    schedule: {},
    address: {
      line1: "",
      line2: "",
      unit_no: "",
      postal_code: "",
      province: "",
      country: "Canada",
      longitude: 123123123,
      latitude: 123123123,
    },
  });
  const [errors, setErrors] = useState({});

  const handleSkillsChange = (event) => {
    setFormData((prev) => ({ ...prev, skills: event.target.value }));
  };

  const handleProvinceChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, province: event.target.value },
    }));
  };

  const handleScheduleChange = (day, time) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: prev.schedule[day]?.includes(time)
          ? prev.schedule[day].filter((t) => t !== time)
          : [...(prev.schedule[day] || []), time],
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const fetchCoordinates = async () => {
  //   const fullAddress = `${formData.address.line1}, Waterloo, ${formData.address.province}, ${formData.address.postal_code}, ${formData.address.country}`;
  //   const encodedAddress = encodeURIComponent(fullAddress);
  //   const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         address: {
  //           ...prev.address,
  //           latitude: parseFloat(data[0].lat),
  //           longitude: parseFloat(data[0].lon),
  //         },
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching coordinates:", error);
  //   }
  // };

  const fetchCoordinates = async () => {
    const { line1, province, postal_code, country } = formData.address;
    const fullAddress = `${line1}, ${province}, ${postal_code}, ${country}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          },
        }));
        return true; // Success
      } else {
        setErrors((prev) => ({ ...prev, coordinates: "Address not found" }));
        return false; // Failure
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setErrors((prev) => ({ ...prev, coordinates: "Error fetching coordinates" }));
      return false;
    }
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits (e.g., 1234567890)";
    if (!formData.address.line1.trim()) newErrors["address.line1"] = "Address Line 1 is required";
    if (!formData.address.postal_code.match(/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/))
      newErrors["address.postal_code"] = "Invalid postal code (e.g., A1A 1A1)";
    if (!formData.address.province) newErrors["address.province"] = "Province is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
    if (!formData.hourlyRate || formData.hourlyRate <= 0) newErrors.hourlyRate = "Hourly rate must be a positive number";
    if (!formData.serviceDescription.trim()) newErrors.serviceDescription = "Service description is required";
    if (Object.keys(formData.schedule).length === 0) newErrors.schedule = "At least one time slot must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep((prev) => prev + 1);
      setErrors({}); // Clear errors when moving forward
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({}); // Clear errors when going back
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeStep === 1 && validateStep2()) {
      await fetchCoordinates();
      console.log("Submitted Data:", formData);
      // Add your submission logic here (e.g., API call)
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px", padding: "20px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>Step 1</StepLabel></Step>
        <Step><StepLabel>Step 2</StepLabel></Step>
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Typography align="center" variant="h5">Service Provider Sign Up - Step 1 of 2</Typography>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              required
              error={!!errors["address.line1"]}
              helperText={errors["address.line1"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2 (optional)"
              name="address.line2"
              value={formData.address.line2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="address.postal_code"
              value={formData.address.postal_code}
              onChange={handleChange}
              required
              error={!!errors["address.postal_code"]}
              helperText={errors["address.postal_code"]}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors["address.province"]}>
              <InputLabel>Province</InputLabel>
              <Select value={formData.address.province} onChange={handleProvinceChange}>
                <MenuItem value=""><em>Select Province</em></MenuItem>
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>{province}</MenuItem>
                ))}
              </Select>
              {errors["address.province"] && (
                <Typography variant="caption" color="error">{errors["address.province"]}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Typography variant="h5">Service Provider Sign Up - Step 2 of 2</Typography>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.skills}>
              <InputLabel>Skills</InputLabel>
              <Select multiple value={formData.skills} onChange={handleSkillsChange}>
                {skillsList.map((skill) => (
                  <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                ))}
              </Select>
              {errors.skills && <Typography variant="caption" color="error">{errors.skills}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hourly Rate ($)"
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleChange}
              required
              error={!!errors.hourlyRate}
              helperText={errors.hourlyRate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service Description"
              name="serviceDescription"
              multiline
              rows={3}
              value={formData.serviceDescription}
              onChange={handleChange}
              required
              error={!!errors.serviceDescription}
              helperText={errors.serviceDescription}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Schedule</Typography>
            {errors.schedule && <Typography variant="caption" color="error">{errors.schedule}</Typography>}
            {daysOfWeek.map((day) => (
              <Grid key={day} container spacing={1} alignItems="center">
                <Typography variant="body1" style={{ minWidth: "100px" }}>{day}</Typography>
                {timeSlots.map((slot) => (
                  <FormControlLabel
                    key={slot}
                    control={<Checkbox checked={formData.schedule[day]?.includes(slot) || false} onChange={() => handleScheduleChange(day, slot)} />}
                    label={slot}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleBack}>Back</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ServiceProviderSignup;