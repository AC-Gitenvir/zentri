import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, ArrowForward, Person, LocalHospital, Event } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import FloatingShapes from '../components/FloatingShapes';

interface FormData {
  name: string;
  age: string;
  gender: string;
  contact: string;
  idNumber: string;
  hospital: string;
  department: string;
  doctor: string;
  appointmentDate: Date | null;
  appointmentTime: Date | null;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    contact: '',
    idNumber: '',
    hospital: '',
    department: '',
    doctor: '',
    appointmentDate: null,
    appointmentTime: null,
  });

  const steps = ['Personal Information', 'Hospital & Department', 'Date & Time'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newPatient = {
      id: Date.now().toString(),
      tokenNumber: `Q${String(state.currentToken).padStart(3, '0')}`,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      contact: formData.contact,
      hospital: formData.hospital,
      department: formData.department,
      doctor: formData.doctor,
      appointmentDate: formData.appointmentDate?.toISOString().split('T')[0] || '',
      appointmentTime: formData.appointmentTime?.toTimeString().slice(0, 5) || '',
      status: 'waiting' as const,
      registrationTime: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_PATIENT', payload: newPatient });
    navigate(`/patient/queue/${newPatient.id}`);
  };

  const getSelectedHospital = () => {
    return state.hospitals.find(h => h.name === formData.hospital);
  };

  const getDepartmentDoctors = () => {
    const dept = state.departments.find(d => d.name === formData.department);
    return dept ? dept.doctors : [];
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID Number (Aadhar/PAN)"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Hospital</InputLabel>
                  <Select
                    value={formData.hospital}
                    label="Select Hospital"
                    onChange={(e) => handleInputChange('hospital', e.target.value)}
                  >
                    {state.hospitals.map((hospital) => (
                      <MenuItem key={hospital.id} value={hospital.name}>
                        <Box>
                          <Typography variant="body1">{hospital.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {hospital.location}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {formData.hospital && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Department</InputLabel>
                    <Select
                      value={formData.department}
                      label="Select Department"
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    >
                      {getSelectedHospital()?.departments.map((dept: string, index: number) => (
                        <MenuItem key={index} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {formData.department && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Doctor</InputLabel>
                    <Select
                      value={formData.doctor}
                      label="Select Doctor"
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                    >
                      {getDepartmentDoctors().map((doctor: string, index: number) => (
                        <MenuItem key={index} value={doctor}>
                          {doctor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Appointment Date"
                  value={formData.appointmentDate}
                  onChange={(date) => handleInputChange('appointmentDate', date)}
                  slotProps={{ textField: { fullWidth: true } }}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Appointment Time"
                  value={formData.appointmentTime}
                  onChange={(time) => handleInputChange('appointmentTime', time)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </Grid>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.name && formData.age && formData.gender && formData.contact && formData.idNumber;
      case 1:
        return formData.hospital && formData.department && formData.doctor;
      case 2:
        return formData.appointmentDate && formData.appointmentTime;
      default:
        return false;
    }
  };

  return (
    <>
      <FloatingShapes />
      <Box className="gradient-bg" sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Box display="flex" alignItems="center" mb={4}>
            <IconButton
              onClick={() => navigate('/patient')}
              sx={{
                mr: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" color="primary" fontWeight="bold">
              Registration Form
            </Typography>
          </Box>

          <Card className="neumorphic-card" sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={({ active, completed }) => (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: active || completed 
                              ? 'linear-gradient(45deg, #1976D2, #42A5F5)'
                              : 'rgba(0, 0, 0, 0.1)',
                            color: active || completed ? 'white' : 'rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          {index === 0 && <Person />}
                          {index === 1 && <LocalHospital />}
                          {index === 2 && <Event />}
                        </Box>
                      )}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <AnimatePresence mode="wait">
                {renderStepContent(activeStep)}
              </AnimatePresence>

              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isStepValid(activeStep)}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                      px: 4,
                    }}
                  >
                    Complete Registration
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isStepValid(activeStep)}
                    endIcon={<ArrowForward />}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default RegistrationForm;