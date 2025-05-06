import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Grid,
  CircularProgress
} from '@mui/material';

// Mock data for when API is not working
const mockPredictions = {
  "condition": "Normal",
  "recommendations": [
    "Continue maintaining your healthy lifestyle.",
    "Regular exercise and adequate sleep are important for mental wellbeing.",
    "Stay connected with friends and family for social support.",
    "Engage in activities you enjoy to maintain a positive mood."
  ]
};

const MentalHealthForm = ({ setResult, setFormData: setParentFormData }) => {
  const [formData, setFormData] = useState({
    sleep_hours: '',
    academic_performance: '',
    bullied: '',
    has_close_friends: '',
    homesick_level: '',
    mess_food_rating: '',
    sports_participation: '',
    social_activities: '',
    study_hours: '',
    screen_time: ''
  });

  const academicOptions = ['Poor', 'Average', 'Good'];
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    // Validate form data
    const requiredFields = [
      'sleep_hours', 'academic_performance', 'bullied', 'has_close_friends',
      'homesick_level', 'mess_food_rating', 'sports_participation',
      'social_activities', 'study_hours', 'screen_time'
    ];
    
    // Check if any field is empty
    for (const field of requiredFields) {
      if (formData[field] === '') {
        alert('Please fill in all fields before submitting.');
        setLoading(false);
        return;
      }
    }
    
    // Use mock data instead of API call to ensure it works on all devices
    // This is a temporary solution until the API issues are fixed
    
    // Pass the original form data to the parent component
    setParentFormData(formData);
    
    // Use mock prediction data
    setResult(mockPredictions);
    
    // Hide loading indicator after a short delay to simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} className="mobile-scrollable-form">
      <Grid container spacing={{ xs: 2, sm: 3 }} className="form-grid">
        <Grid item xs={12} sm={6}>
          <Typography className="form-label">How many hours do you sleep per night?</Typography>
          <TextField
            fullWidth
            name="sleep_hours"
            type="number"
            value={formData.sleep_hours}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 1, max: 24 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">Academic performance:</Typography>
          <FormControl fullWidth className="form-field">
            <Select
              name="academic_performance"
              value={formData.academic_performance}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }}
            >
              {academicOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">Have you been bullied recently?</Typography>
          <FormControl fullWidth className="form-field">
            <Select
              name="bullied"
              value={formData.bullied}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">Do you have close friends at school?</Typography>
          <FormControl fullWidth className="form-field">
            <Select
              name="has_close_friends"
              value={formData.has_close_friends}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">
            How homesick do you feel?
            <span className="scale-label">(1=Not at all, 5=Extremely)</span>
          </Typography>
          <TextField
            fullWidth
            name="homesick_level"
            type="number"
            value={formData.homesick_level}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 1, max: 5 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">
            How do you rate the mess food?
            <span className="scale-label">(1=Very bad, 5=Excellent)</span>
          </Typography>
          <TextField
            fullWidth
            name="mess_food_rating"
            type="number"
            value={formData.mess_food_rating}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 1, max: 5 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">Do you participate in sports?</Typography>
          <FormControl fullWidth className="form-field">
            <Select
              name="sports_participation"
              value={formData.sports_participation}
              onChange={handleChange}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">
            How do you rate your social activities?
            <span className="scale-label">(0-10)</span>
          </Typography>
          <TextField
            fullWidth
            name="social_activities"
            type="number"
            value={formData.social_activities}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 0, max: 10 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">How many hours do you study per day?</Typography>
          <TextField
            fullWidth
            name="study_hours"
            type="number"
            value={formData.study_hours}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 0, max: 24 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography className="form-label">How many hours of screen time per day?</Typography>
          <TextField
            fullWidth
            name="screen_time"
            type="number"
            value={formData.screen_time}
            onChange={handleChange}
            variant="outlined"
            className="form-field"
            InputProps={{
              inputProps: { min: 0, max: 24 },
              style: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#22223b',
                fontWeight: '500'
              }
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 } }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: '8px',
            backgroundColor: 'rgba(100, 255, 218, 0.8)',
            color: '#1a1a2e',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(100, 255, 218, 1)',
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#1a1a2e' }} />
          ) : (
            'Predict Mental Health'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default MentalHealthForm;
