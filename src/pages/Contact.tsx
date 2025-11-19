import React, { memo } from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Contact = memo(() => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: { xs: 2, sm: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Get in touch with our healthcare team.
        </Typography>
      </Box>
    </Container>
  );
});

Contact.displayName = 'Contact';

