import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

// Hardcoded API URL to ensure it works on all devices
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

  const [academicOptions, setAcademicOptions] = useState(['Poor', 'Average', 'Good']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch academic performance options from the API
    const fetchAcademicOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/academic-options`);
        if (response.data && response.data.length > 0) {
          setAcademicOptions(response.data);
        }
      } catch (error) {
        console.error('Error fetching academic options:', error);
      }
    };

    fetchAcademicOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    const requiredFields = [
      'sleep_hours', 'homesick_level', 'mess_food_rating',
      'social_activities', 'study_hours', 'screen_time'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in all required fields`);
        return;
      }
    }

    // Validate numeric fields
    const numericFields = {
      'sleep_hours': { min: 1, max: 24 },
      'homesick_level': { min: 1, max: 5 },
      'mess_food_rating': { min: 1, max: 5 },
      'social_activities': { min: 0, max: 10 },
      'study_hours': { min: 0, max: 24 },
      'screen_time': { min: 0, max: 24 }
    };

    for (const [field, range] of Object.entries(numericFields)) {
      const value = parseInt(formData[field]);
      if (isNaN(value) || value < range.min || value > range.max) {
        setError(`${field.replace('_', ' ')} must be between ${range.min} and ${range.max}`);
        return;
      }
    }

    setLoading(true);

    try {
      // Convert string Yes/No values to boolean for API compatibility
      const formattedData = {
        ...formData,
        // Convert Yes/No strings to boolean values
        bullied: formData.bullied === 'Yes',
        has_close_friends: formData.has_close_friends === 'Yes',
        sports_participation: formData.sports_participation === 'Yes',
        // Ensure numeric fields are numbers
        sleep_hours: Number(formData.sleep_hours),
        homesick_level: Number(formData.homesick_level),
        mess_food_rating: Number(formData.mess_food_rating),
        social_activities: Number(formData.social_activities),
        study_hours: Number(formData.study_hours),
        screen_time: Number(formData.screen_time)
      };

      console.log('Sending data to API:', formattedData);
      console.log('API URL:', API_URL);

      // Simple direct API call with longer timeout
      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/predict`,
        data: formattedData,
        timeout: 60000, // 60 seconds timeout
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

      // Simple error message for all cases
      setError('Connection error. Please check your internet connection and try again.');

      // Log detailed error for debugging
      if (error.response) {
        console.log('Error response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
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

      {error && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: '8px',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
            maxWidth: '100%',
            mx: 'auto'
          }}
        >
          <Typography
            color="error"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              wordBreak: 'break-word'
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

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
