import React, { memo } from 'react';
import { Box, Typography, Container } from '@mui/material';

export const About = memo(() => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: { xs: 2, sm: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Information about the healthcare organization.
        </Typography>
      </Box>
    </Container>
  );
});

About.displayName = 'About';
