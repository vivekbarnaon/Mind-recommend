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
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

// API URL for backend connection
const API_URL = 'https://mind-recommend-3.onrender.com';

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
  const [error, setError] = useState('');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

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
    setError('');
    setShowErrorSnackbar(false);

    // Validate form data
    const requiredFields = [
      'sleep_hours', 'academic_performance', 'bullied', 'has_close_friends',
      'homesick_level', 'mess_food_rating', 'sports_participation',
      'social_activities', 'study_hours', 'screen_time'
    ];

    // Check if any field is empty
    for (const field of requiredFields) {
      if (formData[field] === '') {
        setError('Please fill in all fields before submitting.');
        setShowErrorSnackbar(true);
        setLoading(false);
        return;
      }
    }

    // Check if online
    if (!navigator.onLine) {
      setError('No internet connection. Please check your connection and try again.');
      setShowErrorSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      // Format data exactly as the backend expects it - using numeric values for all fields
      const formattedData = {
        sleep_hours: parseInt(formData.sleep_hours),
        academic_performance: formData.academic_performance === 'Poor' ? 0 :
                             formData.academic_performance === 'Average' ? 1 : 2,
        bullied: formData.bullied === 'Yes' ? 1 : 0,
        has_close_friends: formData.has_close_friends === 'Yes' ? 1 : 0,
        homesick_level: parseInt(formData.homesick_level),
        mess_food_rating: parseInt(formData.mess_food_rating),
        sports_participation: formData.sports_participation === 'Yes' ? 1 : 0,
        social_activities: parseInt(formData.social_activities),
        study_hours: parseInt(formData.study_hours),
        screen_time: parseInt(formData.screen_time)
      };

      console.log('Sending data to API:', formattedData);

      // Make API call
      const response = await axios.post(`${API_URL}/api/predict`, formattedData, {
        timeout: 30000, // 30 seconds timeout
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Pass the original form data to the parent component
      setParentFormData(formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.message === 'Network Error') {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.response && error.response.status === 400) {
        // Show more detailed error for debugging
        if (error.response.data && error.response.data.error) {
          console.log('API error details:', error.response.data);
          setError(`API error: ${error.response.data.error}`);
        } else {
          setError('Invalid input data. Please check your entries and try again.');
        }
      } else {
        setError('An error occurred. Please try again later.');
      }

      setShowErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
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

      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowErrorSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowErrorSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

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
