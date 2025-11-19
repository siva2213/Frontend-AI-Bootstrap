import React, { memo } from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Services = memo(() => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: { xs: 2, sm: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Services
        </Typography>
        <Typography variant="body1" paragraph>
          Our comprehensive healthcare services.
        </Typography>
      </Box>
    </Container>
  );
});

Services.displayName = 'Services';

