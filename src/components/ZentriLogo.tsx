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
      {/* Zentri Logo SVG */}
      <Box
        sx={{
          width: currentSize.logo,
          height: currentSize.logo,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 4px 8px rgba(21, 101, 192, 0.2))',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Drop shadow */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(21, 101, 192, 0.2)"/>
            </filter>
            
            {/* Main gradient for the Z shape */}
            <linearGradient id="zentriGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0D47A1', stopOpacity: 1 }} />
              <stop offset="25%" style={{ stopColor: '#1565C0', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1976D2', stopOpacity: 1 }} />
              <stop offset="75%" style={{ stopColor: '#42A5F5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#90CAF9', stopOpacity: 1 }} />
            </linearGradient>
            
            {/* Highlight gradient */}
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#42A5F5', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#90CAF9', stopOpacity: 0.6 }} />
            </linearGradient>
            
            {/* Arrow gradient */}
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#42A5F5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#90CAF9', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main Z shape - top horizontal bar */}
          <path
            d="M 30 35 Q 40 35 50 35 L 150 35 Q 160 35 170 35 L 170 55 Q 160 55 150 55 L 50 55 Q 40 55 30 55 Z"
            fill="url(#zentriGradient)"
            filter="url(#shadow)"
          />
          
          {/* Main Z shape - diagonal bar */}
          <path
            d="M 150 55 L 170 55 L 170 75 L 150 75 L 130 95 L 110 95 L 90 75 L 70 75 L 50 55 L 30 55 L 30 75 L 50 75 L 70 95 L 90 95 L 110 75 L 130 75 L 150 55 Z"
            fill="url(#zentriGradient)"
            filter="url(#shadow)"
          />
          
          {/* Main Z shape - bottom horizontal bar */}
          <path
            d="M 30 95 Q 40 95 50 95 L 150 95 Q 160 95 170 95 L 170 115 Q 160 115 150 115 L 50 115 Q 40 115 30 115 Z"
            fill="url(#zentriGradient)"
            filter="url(#shadow)"
          />
          
          {/* Arrow element at the bottom-right */}
          <path
            d="M 140 105 L 155 105 L 155 120 L 170 105 L 155 90 L 155 105 Z"
            fill="url(#arrowGradient)"
          />
          
          {/* Highlight overlay for 3D effect */}
          <path
            d="M 30 35 Q 40 35 50 35 L 150 35 Q 160 35 170 35 L 170 55 Q 160 55 150 55 L 50 55 Q 40 55 30 55 Z"
            fill="url(#highlightGradient)"
            opacity="0.3"
          />
        </svg>
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