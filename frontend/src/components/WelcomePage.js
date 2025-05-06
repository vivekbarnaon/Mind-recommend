import React from 'react';
import { Box, Typography, Button, Container, Grid, Link } from '@mui/material';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DatasetIcon from '@mui/icons-material/Dataset';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GitHubIcon from '@mui/icons-material/GitHub';

const WelcomePage = ({ onGetStarted }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 8
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <PsychologyIcon
                sx={{
                  fontSize: { xs: 40, sm: 60 },
                  color: 'rgba(100, 255, 218, 0.9)',
                  mr: 2,
                  filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.5))'
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                  background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.9), rgba(74, 78, 105, 0.9))',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 2px rgba(100, 255, 218, 0.3))',
                  mb: 1
                }}
              >
                Mind Recommend
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}
            >
              AI Lab Assignment
            </Typography>

            <Box
              sx={{
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '16px',
                p: { xs: 3, sm: 5 },
                mb: 5,
                maxWidth: '600px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.8), rgba(74, 78, 105, 0.8))',
                  zIndex: 1
                }
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 3,
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Welcome to the Mental Health Assessment Tool. This application uses AI to analyze your responses and provide personalized mental health recommendations.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Fill out a simple questionnaire about your daily habits, academic performance, and social interactions to receive insights about your mental wellbeing.
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: 600,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.8) 0%, rgba(74, 78, 105, 0.9) 100%)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                color: '#0a192f',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(100, 255, 218, 0.3)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transition: '0.5s'
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 7px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(100, 255, 218, 0.5)',
                  background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.9) 0%, rgba(74, 78, 105, 1) 100%)'
                },
                '&:hover::before': {
                  left: '100%'
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Dataset Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box
              className="welcome-dataset-box"
              sx={{
                mt: 8,
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '16px',
                p: { xs: 3, sm: 4 },
                maxWidth: '800px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DatasetIcon
                  sx={{
                    fontSize: 30,
                    color: 'rgba(100, 255, 218, 0.9)',
                    mr: 1,
                    filter: 'drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))'
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.9), rgba(74, 78, 105, 0.9))',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Dataset
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Our research utilized the CIFAKE dataset, a comprehensive collection of real and AI-generated images specifically designed
                for training and testing detection algorithms. The dataset consists of 60,000 images (30,000 real and 30,000 AI-generated)
                with a resolution of 32x32 pixels. The real images are sourced from the CIFAR-10 dataset, while the AI-generated images are
                created using Stable Diffusion v1.5, providing a balanced and diverse set of samples for training and evaluation.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }} className="welcome-stats-grid">
                <Grid item xs={6} sm={4}>
                  <Box
                    className="welcome-stats-box"
                    sx={{
                    p: 1,
                    borderRadius: '8px',
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                  }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(100, 255, 218, 0.9)', mb: 0.5 }}>
                      Total Images
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      60,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box
                    className="welcome-stats-box"
                    sx={{
                    p: 1,
                    borderRadius: '8px',
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                  }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(100, 255, 218, 0.9)', mb: 0.5 }}>
                      Real Images
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      30,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box
                    className="welcome-stats-box"
                    sx={{
                    p: 1,
                    borderRadius: '8px',
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                  }}>
                    <Typography variant="subtitle2" sx={{ color: 'rgba(100, 255, 218, 0.9)', mb: 0.5 }}>
                      AI-Generated
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      30,000
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          {/* Model Architecture Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Box
              className="welcome-architecture-box"
              sx={{
                mt: 4,
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(74, 78, 105, 0.2) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '16px',
                p: { xs: 3, sm: 4 },
                maxWidth: '800px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 80px rgba(100, 255, 218, 0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArchitectureIcon
                  sx={{
                    fontSize: 30,
                    color: 'rgba(100, 255, 218, 0.9)',
                    mr: 1,
                    filter: 'drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))'
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.9), rgba(74, 78, 105, 0.9))',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Model Architecture
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                We employed transfer learning techniques using four pre-trained convolutional neural network architectures: ResNet50,
                VGG16, EfficientNetV2-B0, and MobileNetV3Small. Each model was fine-tuned on our dataset with the following
                modifications:
              </Typography>

              <Box sx={{ pl: 2 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 1,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      bgcolor: 'rgba(100, 255, 218, 0.9)',
                      mr: 1.5,
                      boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)'
                    }}
                  />
                  Addition of batch normalization layers to improve training stability
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 1,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      bgcolor: 'rgba(100, 255, 218, 0.9)',
                      mr: 1.5,
                      boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)'
                    }}
                  />
                  Implementation of dropout (rate = 0.5) to prevent overfitting
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      bgcolor: 'rgba(100, 255, 218, 0.9)',
                      mr: 1.5,
                      boxShadow: '0 0 5px rgba(100, 255, 218, 0.5)'
                    }}
                  />
                  Custom learning rate scheduler with warm-up and decay phases
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Footer with GitHub Link */}
        <Box
          component="footer"
          className="welcome-footer"
          sx={{
            width: '100%',
            py: 3,
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.6) 100%)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(100, 255, 218, 0.1)',
          }}
        >
          <Link
            href="https://github.com/vivekbarnaon/Mind-recommend"
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-footer-link"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(100, 255, 218, 0.9)',
              }
            }}
          >
            <GitHubIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              View on GitHub
            </Typography>
          </Link>
        </Box>
      </Container>
    </motion.div>
  );
};

export default WelcomePage;
