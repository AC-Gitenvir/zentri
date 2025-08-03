import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, QrCodeScanner } from '@mui/icons-material';
import FloatingShapes from '../components/FloatingShapes';

const QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      const mockResult = {
        hospital: 'SMS Hospital',
        department: 'Cardiology',
        location: 'JLN Marg, Jaipur'
      };
      setScanResult(JSON.stringify(mockResult));
      setIsScanning(false);
    }, 2000);
  };

  const handleProceed = () => {
    if (scanResult) {
      const data = JSON.parse(scanResult);
      // Navigate to registration form with pre-filled data
      navigate('/patient/register', { state: data });
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
              QR Code Scanner
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="neumorphic-card">
              <CardContent sx={{ textAlign: 'center', p: 6 }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    mx: 'auto',
                    mb: 4,
                    border: '3px dashed',
                    borderColor: isScanning ? 'primary.main' : 'grey.300',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isScanning 
                      ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.1), rgba(66, 165, 245, 0.1))'
                      : 'rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {isScanning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <QrCodeScanner sx={{ fontSize: 80, color: 'primary.main' }} />
                    </motion.div>
                  ) : (
                    <QrCodeScanner sx={{ fontSize: 80, color: 'grey.400' }} />
                  )}
                </Box>

                <Typography variant="h6" gutterBottom>
                  {isScanning ? 'Scanning QR Code...' : 'Ready to Scan'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" mb={4}>
                  {isScanning 
                    ? 'Please hold your camera steady while we detect the hospital information.'
                    : 'Position the hospital QR code within the frame to automatically detect hospital details.'
                  }
                </Typography>

                {!scanResult && !isScanning && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleScan}
                    sx={{
                      background: 'linear-gradient(45deg, #1976D2, #42A5F5)',
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Start Scanning
                  </Button>
                )}

                {scanResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
                      <Typography variant="body2" fontWeight="bold">
                        QR Code Detected Successfully!
                      </Typography>
                      <Typography variant="body2">
                        Hospital: {JSON.parse(scanResult).hospital}
                      </Typography>
                      <Typography variant="body2">
                        Department: {JSON.parse(scanResult).department}
                      </Typography>
                      <Typography variant="body2">
                        Location: {JSON.parse(scanResult).location}
                      </Typography>
                    </Alert>
                    
                    <Box display="flex" gap={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => setScanResult(null)}
                      >
                        Scan Again
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleProceed}
                        sx={{
                          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                        }}
                      >
                        Proceed to Registration
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default QRScanner;