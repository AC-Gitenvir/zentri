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
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { QrCodeScanner, PersonAdd, ArrowBack } from '@mui/icons-material';
import FloatingShapes from '../components/FloatingShapes';

const PatientInterface: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
        <Container maxWidth="md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box display="flex" alignItems="center" mb={4}>
              <IconButton
                onClick={() => navigate('/')}
                sx={{
                  mr: 2,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" color="primary" fontWeight="bold">
                Patient Registration
              </Typography>
            </Box>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
                mb={4}
              >
                Choose your registration method
              </Typography>
            </motion.div>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6}>
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
                    onClick={() => navigate('/patient/qr-scan')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          background: 'linear-gradient(135deg, #E8F5E8, #4CAF50)',
                        }}
                      >
                        <QrCodeScanner sx={{ fontSize: 50 }} />
                      </Avatar>
                      <Typography variant="h5" gutterBottom color="secondary">
                        QR Code Scan
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        Scan the hospital's QR code to automatically detect hospital information and register quickly.
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                          py: 1.5,
                        }}
                      >
                        Scan QR Code
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} sm={6}>
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
                    onClick={() => navigate('/patient/register')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          background: 'linear-gradient(135deg, #E3F2FD, #1976D2)',
                        }}
                      >
                        <PersonAdd sx={{ fontSize: 50 }} />
                      </Avatar>
                      <Typography variant="h5" gutterBottom color="primary">
                        Online Registration
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        Fill out the registration form manually by selecting hospital, department, and doctor.
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #1976D2, #42A5F5)',
                          py: 1.5,
                        }}
                      >
                        Register Online
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <motion.div variants={itemVariants}>
              <Box textAlign="center" mt={6}>
                <Typography variant="body2" color="text.secondary">
                  After registration, you'll receive a token number and real-time updates about your queue position.
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default PatientInterface;