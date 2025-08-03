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
      {/* Zentri Logo */}
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
        {/* Main Z Shape */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '8%',
              left: '8%',
              width: '84%',
              height: '84%',
              background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 30%, #42A5F5 70%, #90CAF9 100%)',
              borderRadius: '16px',
              transform: 'rotate(-3deg)',
              boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3), 0 4px 16px rgba(21, 101, 192, 0.2)',
              zIndex: 1,
            },
          }}
        />
        
        {/* Z Letter */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            zIndex: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0%',
              left: '0%',
              width: '100%',
              height: '12%',
              background: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '44%',
              left: '0%',
              width: '100%',
              height: '12%',
              background: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }
          }}
        />
        
        {/* Diagonal Line */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            width: '85%',
            height: '12%',
            background: 'white',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }}
        />
        
        {/* Arrow Element */}
        <Box
          sx={{
            position: 'absolute',
            top: '12%',
            right: '12%',
            width: '24px',
            height: '24px',
            background: 'linear-gradient(135deg, #42A5F5, #90CAF9)',
            borderRadius: '50%',
            transform: 'rotate(45deg)',
            boxShadow: '0 4px 12px rgba(66, 165, 245, 0.4)',
            zIndex: 3,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '14px',
              height: '2px',
              background: 'white',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
              borderRadius: '1px',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '14px',
              background: 'white',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
              borderRadius: '1px',
            }
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