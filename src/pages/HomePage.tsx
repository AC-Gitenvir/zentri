import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PersonOutline, LocalHospital, QrCodeScanner, Schedule } from '@mui/icons-material';
import FloatingShapes from '../components/FloatingShapes';
import ZentriLogo from '../components/ZentriLogo';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <FloatingShapes />
      <Box className="gradient-bg" sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box textAlign="center" mb={6}>
              <motion.div variants={itemVariants}>
                <ZentriLogo size="large" variant="vertical" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 400 }}
                >
                  Smart OPD Registration & Patient Queue Management
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                >
                  Streamline your hospital experience with our intelligent queue management system.
                  Register online, get real-time updates, and skip the wait.
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={4} justifyContent="center" mb={6}>
              <Grid item xs={12} md={5}>
                <motion.div variants={itemVariants}>
                  <Card
                    className="neumorphic-card"
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => navigate('/patient')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                              <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 3,
                            background: 'linear-gradient(135deg, #E3F2FD, #1565C0)',
                          }}
                        >
                        <PersonOutline sx={{ fontSize: 40 }} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom color="primary">
                        For Patients
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        Register online, scan QR codes, book appointments, and track your queue position in real-time.
                      </Typography>
                                              <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            background: 'linear-gradient(45deg, #1565C0, #42A5F5)',
                            py: 1.5,
                          }}
                        >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={5}>
                <motion.div variants={itemVariants}>
                  <Card
                    className="neumorphic-card"
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => navigate('/doctor')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                              <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 3,
                            background: 'linear-gradient(135deg, #E3F2FD, #1976D2)',
                          }}
                        >
                        <LocalHospital sx={{ fontSize: 40 }} />
                      </Avatar>
                      <Typography variant="h4" gutterBottom color="secondary">
                        For Doctors
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        Manage patient queues, view appointments, and provide seamless healthcare services.
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #1976D2, #64B5F6)',
                          py: 1.5,
                        }}
                      >
                        Access Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Box textAlign="center">
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Key Features
                </Typography>
                <Grid container spacing={3} justifyContent="center" mt={2}>
                  {[
                    { icon: QrCodeScanner, text: 'QR Code Registration' },
                    { icon: Schedule, text: 'Real-time Queue Updates' },
                    { icon: LocalHospital, text: 'Multi-Hospital Support' },
                  ].map((feature, index) => (
                    <Grid item key={index}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <feature.icon color="primary" />
                        <Typography variant="body2" color="text.secondary">
                          {feature.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;