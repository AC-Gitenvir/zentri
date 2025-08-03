import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AppProvider } from './context/AppContext';
import theme from './theme/theme';
import HomePage from './pages/HomePage';
import PatientInterface from './pages/PatientInterface';
import DoctorInterface from './pages/DoctorInterface';
import RegistrationForm from './pages/RegistrationForm';
import QRScanner from './pages/QRScanner';
import PatientQueue from './pages/PatientQueue';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/patient" element={<PatientInterface />} />
                <Route path="/doctor" element={<DoctorInterface />} />
                <Route path="/patient/register" element={<RegistrationForm />} />
                <Route path="/patient/qr-scan" element={<QRScanner />} />
                <Route path="/patient/queue/:tokenId" element={<PatientQueue />} />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;