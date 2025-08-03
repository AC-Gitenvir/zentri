import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, Person, Schedule, LocalHospital, CheckCircle } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import FloatingShapes from '../components/FloatingShapes';

const PatientQueue: React.FC = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());

  const patient = state.patients.find(p => p.id === tokenId);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!patient) {
    return (
      <Container>
        <Typography variant="h4">Patient not found</Typography>
      </Container>
    );
  }

  const waitingPatients = state.patients.filter(p => 
    p.hospital === patient.hospital && 
    p.department === patient.department && 
    p.doctor === patient.doctor &&
    p.status === 'waiting'
  );

  const queuePosition = waitingPatients.findIndex(p => p.id === patient.id) + 1;
  const estimatedWaitTime = queuePosition * 15; // 15 minutes per patient

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Waiting in Queue';
      case 'in-progress': return 'Currently with Doctor';
      case 'completed': return 'Consultation Complete';
      default: return 'Unknown Status';
    }
  };

  return (
    <>
      <FloatingShapes />
      <Box className="gradient-bg" sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
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
              Queue Status
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {patient.status === 'waiting' && queuePosition <= 3 && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight="bold">
                  🔔 Your turn is approaching! Please be ready.
                </Typography>
              </Alert>
            )}

            <Card className="neumorphic-card" sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box textAlign="center" mb={4}>
                  <Typography variant="h2" color="primary" fontWeight="bold" mb={2}>
                    {patient.tokenNumber}
                  </Typography>
                  <Chip
                    label={getStatusText(patient.status)}
                    color={getStatusColor(patient.status) as any}
                    size="large"
                    sx={{ px: 2, py: 1, fontSize: '1rem' }}
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{patient.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age: {patient.age} | Gender: {patient.gender}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ mr: 2, bgcolor: 'secondary.light' }}>
                        <LocalHospital />
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {patient.hospital}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {patient.department} - {patient.doctor}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2, bgcolor: 'info.light' }}>
                        <Schedule />
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          Appointment
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {patient.appointmentDate} at {patient.appointmentTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2, bgcolor: 'warning.light' }}>
                        <CheckCircle />
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          Registration Time
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(patient.registrationTime).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {patient.status === 'waiting' && (
              <Card className="neumorphic-card">
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Queue Information
                  </Typography>
                  
                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Queue Position</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {queuePosition} of {waitingPatients.length}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={((waitingPatients.length - queuePosition + 1) / waitingPatients.length) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary" fontWeight="bold">
                          {queuePosition}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Position in Queue
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="secondary" fontWeight="bold">
                          ~{estimatedWaitTime}m
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estimated Wait Time
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box mt={3} p={2} bgcolor="info.light" borderRadius={2}>
                    <Typography variant="body2" textAlign="center">
                      💡 You'll receive notifications when your turn is approaching. 
                      Keep this page open for real-time updates.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default PatientQueue;