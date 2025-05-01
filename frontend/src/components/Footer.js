import React from 'react';
import { Box, Typography, Link, Container, Divider, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Footer.css'; // Import custom CSS for footer

const Footer = () => {
  const theme = useTheme();

  return (
    <footer className="app-footer">
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              Mental Health Assessment
            </Typography>
            <Typography variant="body2" color="#c9ada7">
              A tool to help assess mental health conditions and provide recommendations.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              Resources
            </Typography>
            <Link href="https://www.who.int/health-topics/mental-health" target="_blank" color="#c9ada7" sx={{ display: 'block', mb: 1 }}>
              WHO Mental Health
            </Link>
            <Link href="https://www.nimh.nih.gov/" target="_blank" color="#c9ada7" sx={{ display: 'block', mb: 1 }}>
              National Institute of Mental Health
            </Link>
            <Link href="https://www.samhsa.gov/" target="_blank" color="#c9ada7" sx={{ display: 'block' }}>
              SAMHSA
            </Link>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="#f2e9e4" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="#c9ada7" sx={{ maxWidth: 300 }}>
              This tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" color="#c9ada7" align="center">
            Made with
          </Typography>
          <FavoriteIcon sx={{ mx: 0.5, fontSize: 16, color: "#e07a5f" }} />
          <Typography variant="body2" color="#c9ada7" align="center">
            for a better mental health future
          </Typography>
        </Box>

        <Typography variant="body2" color="#c9ada7" align="center" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} Mental Health Assessment
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
