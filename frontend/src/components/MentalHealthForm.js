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
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';

// API URL for backend connection
const API_URL = 'https://mind-recommend-3.onrender.com';


const MentalHealthForm = ({ setResult, setFormData: setParentFormData }) => {
  const [formData, setFormData] = useState({
    sleep_hours: '',
    academic_performance: 'Average',
    bullied: 'No',
    has_close_friends: 'Yes',
    homesick_level: '',
    mess_food_rating: '',
    sports_participation: 'No',
    social_activities: '',
    study_hours: '',
    screen_time: ''
  });

  const academicOptions = ['Poor', 'Average', 'Good'];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  // No API calls on component mount to prevent errors

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
        setError(`Please fill in all fields before submitting.`);
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
      // Format data exactly as the backend expects it
      // Make sure all fields are in the format expected by the backend
      const formattedData = {
        sleep_hours: Number(formData.sleep_hours),
        academic_performance: String(formData.academic_performance).toLowerCase(), // Ensure it's a lowercase string
        bullied: formData.bullied === 'Yes' ? 1 : 0,
        has_close_friends: formData.has_close_friends === 'Yes' ? 1 : 0,
        homesick_level: Number(formData.homesick_level),
        mess_food_rating: Number(formData.mess_food_rating),
        sports_participation: formData.sports_participation === 'Yes' ? 1 : 0,
        social_activities: Number(formData.social_activities),
        study_hours: Number(formData.study_hours),
        screen_time: Number(formData.screen_time)
      };

      console.log('Formatted data for API:', formattedData);

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

      // Set appropriate error message
      if (error.message === 'Network Error') {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.response) {
        if (error.response.status === 400) {
          // Show the actual error message from the backend if available
          if (error.response.data && error.response.data.error) {
            console.log('API 400 error details:', error.response.data);
            // Create a more user-friendly message
            if (error.response.data.error.includes("'int' object has no attribute 'lower'")) {
              setError('There was an issue with the academic performance field. Please try again.');
            } else {
              setError(`Data format error: ${error.response.data.error}`);
            }
          } else {
            setError('Invalid input data format. Please make sure all fields are filled correctly.');
          }
        } else if (error.response.status === 500) {
          setError('Server error. Our team has been notified and is working on it.');
        } else {
          setError(`Server error (${error.response.status}). Please try again later.`);
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
                fontWeight: '500',
                '.MuiSelect-select': { color: '#22223b' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a4e69',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    '& .MuiMenuItem-root': {
                      color: '#22223b',
                      fontWeight: '500',
                      '&:hover': {
                        bgcolor: 'rgba(74, 78, 105, 0.1)'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(74, 78, 105, 0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(74, 78, 105, 0.3)'
                        }
                      }
                    }
                  }
                }
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
                fontWeight: '500',
                '.MuiSelect-select': { color: '#22223b' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a4e69',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    '& .MuiMenuItem-root': {
                      color: '#22223b',
                      fontWeight: '500',
                      '&:hover': {
                        bgcolor: 'rgba(74, 78, 105, 0.1)'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(74, 78, 105, 0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(74, 78, 105, 0.3)'
                        }
                      }
                    }
                  }
                }
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
                fontWeight: '500',
                '.MuiSelect-select': { color: '#22223b' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a4e69',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    '& .MuiMenuItem-root': {
                      color: '#22223b',
                      fontWeight: '500',
                      '&:hover': {
                        bgcolor: 'rgba(74, 78, 105, 0.1)'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(74, 78, 105, 0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(74, 78, 105, 0.3)'
                        }
                      }
                    }
                  }
                }
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
                fontWeight: '500',
                '.MuiSelect-select': { color: '#22223b' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a4e69',
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    '& .MuiMenuItem-root': {
                      color: '#22223b',
                      fontWeight: '500',
                      '&:hover': {
                        bgcolor: 'rgba(74, 78, 105, 0.1)'
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(74, 78, 105, 0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(74, 78, 105, 0.3)'
                        }
                      }
                    }
                  }
                }
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
              },
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4a4e69',
                  }
                }
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
          className="submit-button"
          disabled={loading}
          fullWidth={window.innerWidth < 600} // Full width on mobile
          sx={{
            maxWidth: { xs: '100%', sm: '200px' },
            borderRadius: '8px'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Predict'}
        </Button>
      </Box>
    </Box>
  );
};

export default MentalHealthForm;
