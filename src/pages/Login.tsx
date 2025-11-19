import React, { memo } from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Login = memo(() => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: { xs: 2, sm: 4 } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" paragraph>
          Login to access your healthcare account.
        </Typography>
      </Box>
    </Container>
  );
});

Login.displayName = 'Login';

