import React from 'react';
import { Box, Typography } from '@mui/material';

interface ZentriLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
}

const ZentriLogo: React.FC<ZentriLogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'vertical' 
}) => {
  const sizeMap = {
    small: { logo: 60, text: '1.5rem' },
    medium: { logo: 120, text: '2rem' },
    large: { logo: 180, text: '3rem' }
  };

  const currentSize = sizeMap[size];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: variant === 'vertical' ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {/* Zentri Logo Image */}
      <Box
        sx={{
          width: currentSize.logo,
          height: currentSize.logo,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/zentri-logo.png"
          alt="Zentri Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      
      {/* Zentri Text */}
      {showText && (
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: '#1565C0',
            fontWeight: 800,
            fontSize: currentSize.text,
            textShadow: '0 2px 4px rgba(21, 101, 192, 0.2)',
            letterSpacing: '0.05em',
          }}
        >
          ZENTRI
        </Typography>
      )}
    </Box>
  );
};

export default ZentriLogo; 