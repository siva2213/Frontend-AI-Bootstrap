import React, { memo, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScienceIcon from '@mui/icons-material/Science';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';

/**
 * Home Page Component
 *
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Mobile-first responsive grid layout
 * - Accessibility: Full ARIA attributes, semantic HTML
 *
 * Sections:
 * - Hero Section: Prominent banner with value proposition
 * - Welcome Message: Personalized greeting
 * - Services Overview: Grid of service cards with icons
 * - Call-to-Action Buttons: "Find a Lab", "View Your Results", "Pay a Bill"
 */

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceCard[] = [
  {
    title: 'Laboratory Testing',
    description:
      'Comprehensive diagnostic testing services for accurate health insights.',
    icon: <ScienceIcon />,
  },
  {
    title: 'Health Screenings',
    description:
      'Preventive health screenings to help you stay ahead of potential issues.',
    icon: <HealthAndSafetyIcon />,
  },
  {
    title: 'Medical Reports',
    description:
      'Access your test results and medical reports securely online.',
    icon: <AssignmentIcon />,
  },
  {
    title: 'Expert Care',
    description:
      'Trusted healthcare professionals dedicated to your well-being.',
    icon: <LocalHospitalIcon />,
  },
];

const CTA_BUTTONS = [
  {
    label: 'Find a Lab',
    path: '/services',
    icon: <SearchIcon />,
    variant: 'contained' as const,
  },
  {
    label: 'View Your Results',
    path: '/results',
    icon: <VisibilityIcon />,
    variant: 'outlined' as const,
  },
  {
    label: 'Pay a Bill',
    path: '/billing',
    icon: <PaymentIcon />,
    variant: 'outlined' as const,
  },
];

export const Home = memo(() => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Memoized services
  const services = useMemo(() => SERVICES, []);

  // Memoized CTA buttons
  const ctaButtons = useMemo(() => CTA_BUTTONS, []);

  // Handle CTA button click
  const handleCTAClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  // Handle keyboard navigation for CTA buttons
  const handleCTAKeyDown = useCallback(
    (path: string, e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCTAClick(path);
      }
    },
    [handleCTAClick]
  );

  // Memoized service cards
  const serviceCards = useMemo(
    () =>
      services.map(service => (
        <Box
          key={service.title}
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 8px)',
              md: 'calc(25% - 12px)',
            },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          <Card
            sx={{
              height: { xs: '100%', sm: '100%' },
              display: { xs: 'flex', sm: 'flex' },
              flexDirection: { xs: 'column', sm: 'column' },
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
            role="article"
            aria-labelledby={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                padding: { xs: 2, sm: 3 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  color: 'primary.main',
                  marginBottom: 2,
                  '& svg': {
                    fontSize: { xs: 40, sm: 48 },
                  },
                }}
                aria-hidden="true"
              >
                {service.icon}
              </Box>
              <Typography
                id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  marginBottom: 1,
                }}
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  flexGrow: 1,
                }}
              >
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )),
    [services]
  );

  // Memoized CTA buttons
  const ctaButtonElements = useMemo(
    () =>
      ctaButtons.map(button => {
        const handleClick = () => handleCTAClick(button.path);
        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) =>
          handleCTAKeyDown(button.path, e);
        return (
          <Button
            key={button.path}
            variant={button.variant}
            size="large"
            startIcon={button.icon}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            sx={{
              minHeight: 44,
              minWidth: { xs: '100%', sm: 'auto' },
              padding: { xs: '12px 24px', sm: '14px 32px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              width: { xs: '100%', sm: 'auto' },
            }}
            aria-label={button.label}
          >
            {button.label}
          </Button>
        );
      }),
    [ctaButtons, handleCTAClick, handleCTAKeyDown]
  );

  return (
    <Box
      component="main"
      role="main"
      aria-label="Home page"
      sx={{
        minHeight: '100%',
      }}
    >
      {/* Hero Section */}
      <Box
        component="section"
        role="region"
        aria-label="Hero section"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'primary.contrastText',
          padding: { xs: 4, sm: 6, md: 8 },
          textAlign: 'center',
          marginBottom: { xs: 4, sm: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              marginBottom: { xs: 2, sm: 3 },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
            aria-label="Main heading"
          >
            We Find the Answers That Help Healthcare Forward
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              marginBottom: { xs: 3, sm: 4 },
              opacity: 0.95,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            Your trusted partner in healthcare diagnostics and wellness
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Welcome Message */}
        <Box
          component="section"
          role="region"
          aria-label="Welcome message"
          sx={{
            marginBottom: { xs: 4, sm: 6 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              marginBottom: 2,
              color: 'text.primary',
            }}
            aria-label="Welcome heading"
          >
            Welcome to Healthcare
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 800,
              margin: '0 auto',
              fontSize: { xs: '1rem', sm: '1.125rem' },
              color: 'text.secondary',
            }}
          >
            We are committed to providing you with accurate, timely, and
            accessible healthcare services. Our comprehensive range of
            diagnostic tests and health screenings helps you make informed
            decisions about your health and wellness.
          </Typography>
        </Box>

        {/* Call-to-Action Buttons */}
        <Box
          component="section"
          role="region"
          aria-label="Quick actions"
          sx={{
            marginBottom: { xs: 5, sm: 7 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {ctaButtonElements}
        </Box>

        {/* Services Overview */}
        <Box
          component="section"
          role="region"
          aria-label="Services overview"
          sx={{
            marginBottom: { xs: 4, sm: 6 },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              marginBottom: { xs: 3, sm: 4 },
              color: 'text.primary',
            }}
            aria-label="Services heading"
          >
            Our Services
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 2, md: 3 },
            }}
          >
            {serviceCards}
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

Home.displayName = 'Home';
