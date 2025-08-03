import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Paper,
  Badge,
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  ArrowBack, 
  Person, 
  Schedule, 
  CheckCircle, 
  PlayArrow,
  LocalHospital,
  People,
  AccessTime,
  MedicalServices,
  Assignment,
  Visibility,
  Edit,
  Save,
  Close
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import FloatingShapes from '../components/FloatingShapes';

const DoctorInterface: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rajesh Sharma');
  const [selectedDepartment, setSelectedDepartment] = useState('Cardiology');
  const [activeTab, setActiveTab] = useState(0);
  const [consultationDialog, setConsultationDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [rating, setRating] = useState(0);

  // Get all departments and their doctors
  const departments = state.departments;
  const doctors = state.departments.flatMap(dept => dept.doctors);
  
  // Get patients by department
  const departmentPatients = state.patients.filter(p => p.department === selectedDepartment);
  const doctorPatients = departmentPatients.filter(p => p.doctor === selectedDoctor);
  const waitingPatients = doctorPatients.filter(p => p.status === 'waiting');
  const inProgressPatient = doctorPatients.find(p => p.status === 'in-progress');
  const completedPatients = doctorPatients.filter(p => p.status === 'completed');

  const handleStartConsultation = (patientId: string) => {
    // Mark current patient as completed if exists
    if (inProgressPatient) {
      dispatch({
        type: 'UPDATE_PATIENT_STATUS',
        payload: { id: inProgressPatient.id, status: 'completed' }
      });
    }

    // Start new consultation
    dispatch({
      type: 'UPDATE_PATIENT_STATUS',
      payload: { id: patientId, status: 'in-progress' }
    });
  };

  const handleCompleteConsultation = (patientId: string) => {
    dispatch({
      type: 'UPDATE_PATIENT_STATUS',
      payload: { id: patientId, status: 'completed' }
    });
  };

  const handleStartConsultationWithRecord = (patient: any) => {
    setSelectedPatient(patient);
    setConsultationDialog(true);
  };

  const handleSaveConsultation = () => {
    if (selectedPatient) {
      // Here you would typically save to a database
      // For now, we'll just close the dialog
      setConsultationDialog(false);
      setSelectedPatient(null);
      setConsultationNotes('');
      setDiagnosis('');
      setPrescription('');
      setRating(0);
      
      // Complete the consultation
      handleCompleteConsultation(selectedPatient.id);
    }
  };

  const handleGrantAccess = (patientId: string) => {
    dispatch({
      type: 'UPDATE_PATIENT_STATUS',
      payload: { id: patientId, status: 'in-progress' }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <>
      <FloatingShapes />
      <Box className="gradient-bg" sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
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
              Zentri Doctor Dashboard
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Department and Doctor Selection */}
            <Card className="neumorphic-card" sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Specialist Department
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        label="Department"
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Doctor</InputLabel>
                      <Select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        label="Doctor"
                      >
                        {departments
                          .find(dept => dept.name === selectedDepartment)
                          ?.doctors.map((doctor: string) => (
                            <MenuItem key={doctor} value={doctor}>
                              {doctor}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12} md={3}>
                <Card className="glass-card">
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Badge badgeContent={waitingPatients.length} color="warning">
                      <People sx={{ fontSize: 40, color: 'warning.main' }} />
                    </Badge>
                    <Typography variant="h4" color="warning.main" fontWeight="bold" sx={{ mt: 1 }}>
                      {waitingPatients.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Waiting Patients
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="glass-card">
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Badge badgeContent={inProgressPatient ? 1 : 0} color="info">
                      <MedicalServices sx={{ fontSize: 40, color: 'info.main' }} />
                    </Badge>
                    <Typography variant="h4" color="info.main" fontWeight="bold" sx={{ mt: 1 }}>
                      {inProgressPatient ? 1 : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      In Consultation
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="glass-card">
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Badge badgeContent={completedPatients.length} color="success">
                      <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
                    </Badge>
                    <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
                      {completedPatients.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed Today
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="glass-card">
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <AccessTime sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h4" color="primary.main" fontWeight="bold" sx={{ mt: 1 }}>
                      {Math.round(waitingPatients.length * 15)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Est. Wait Time (min)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Tabs for different views */}
            <Card className="neumorphic-card">
              <CardContent sx={{ p: 0 }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab label={`Waiting Queue (${waitingPatients.length})`} />
                  <Tab label={`In Progress (${inProgressPatient ? 1 : 0})`} />
                  <Tab label={`Completed (${completedPatients.length})`} />
                </Tabs>

                {/* Tab Content */}
                <Box sx={{ p: 3 }}>
                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Waiting Patients - {selectedDepartment}
                      </Typography>
                      
                      {waitingPatients.length === 0 ? (
                        <Alert severity="info">
                          No patients currently waiting in the queue.
                        </Alert>
                      ) : (
                        <List>
                          {waitingPatients.map((patient, index) => (
                            <React.Fragment key={patient.id}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar
                                    sx={{
                                      bgcolor: index === 0 ? 'primary.main' : 'grey.400',
                                    }}
                                  >
                                    {patient.tokenNumber}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <Typography variant="body1" fontWeight="bold">
                                        {patient.name}
                                      </Typography>
                                      {index === 0 && (
                                        <Chip
                                          label="Next"
                                          size="small"
                                          color="primary"
                                        />
                                      )}
                                    </Box>
                                  }
                                  secondary={
                                    <Box>
                                      <Typography variant="body2" color="text.secondary">
                                        Age: {patient.age} | Gender: {patient.gender} | Contact: {patient.contact}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Appointment: {patient.appointmentDate} at {patient.appointmentTime}
                                      </Typography>
                                    </Box>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <Button
                                    variant={index === 0 ? 'contained' : 'outlined'}
                                    size="small"
                                    onClick={() => handleGrantAccess(patient.id)}
                                    disabled={!!inProgressPatient}
                                    startIcon={index === 0 ? <PlayArrow /> : <Visibility />}
                                  >
                                    {index === 0 ? 'Grant Access' : 'View'}
                                  </Button>
                                </ListItemSecondaryAction>
                              </ListItem>
                              {index < waitingPatients.length - 1 && <Divider />}
                            </React.Fragment>
                          ))}
                        </List>
                      )}
                    </Box>
                  )}

                  {activeTab === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <MedicalServices sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Currently Consulting
                      </Typography>
                      
                      {inProgressPatient ? (
                        <Card className="glass-card">
                          <CardContent sx={{ p: 3 }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                              <Chip
                                label="In Progress"
                                color="info"
                                icon={<PlayArrow />}
                              />
                              <Typography variant="h6" color="info.main">
                                Token #{inProgressPatient.tokenNumber}
                              </Typography>
                            </Box>
                            
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Box display="flex" alignItems="center">
                                <Avatar sx={{ mr: 2, bgcolor: 'info.light' }}>
                                  <Person />
                                </Avatar>
                                <Box>
                                  <Typography variant="h6">{inProgressPatient.name}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Age: {inProgressPatient.age} | Gender: {inProgressPatient.gender}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Contact: {inProgressPatient.contact}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Appointment: {inProgressPatient.appointmentDate} at {inProgressPatient.appointmentTime}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleStartConsultationWithRecord(inProgressPatient)}
                                startIcon={<Assignment />}
                                sx={{
                                  background: 'linear-gradient(45deg, #1565C0, #42A5F5)',
                                }}
                              >
                                Complete Record
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      ) : (
                        <Alert severity="info">
                          No patient currently in consultation.
                        </Alert>
                      )}
                    </Box>
                  )}

                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Completed Consultations
                      </Typography>
                      
                      {completedPatients.length === 0 ? (
                        <Alert severity="info">
                          No completed consultations today.
                        </Alert>
                      ) : (
                        <List>
                          {completedPatients.map((patient) => (
                            <React.Fragment key={patient.id}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: 'success.light' }}>
                                    <CheckCircle />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={patient.name}
                                  secondary={
                                    <Box>
                                      <Typography variant="body2" color="text.secondary">
                                        Token: {patient.tokenNumber} | Completed at {new Date().toLocaleTimeString()}
                                      </Typography>
                                    </Box>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <Chip
                                    label="Completed"
                                    color="success"
                                    size="small"
                                  />
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider />
                            </React.Fragment>
                          ))}
                        </List>
                      )}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Consultation Record Dialog */}
      <Dialog
        open={consultationDialog}
        onClose={() => setConsultationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              Complete Patient Record - {selectedPatient?.name}
            </Typography>
            <IconButton onClick={() => setConsultationDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                multiline
                rows={3}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter patient diagnosis..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Consultation Notes"
                multiline
                rows={4}
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Enter detailed consultation notes..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prescription"
                multiline
                rows={3}
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Enter prescription details..."
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body1">Patient Rating:</Typography>
                <Rating
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue || 0)}
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConsultationDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveConsultation}
            variant="contained"
            color="primary"
            startIcon={<Save />}
          >
            Save & Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DoctorInterface;