import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = [
    { size: 80, color: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)', delay: 0 },
    { size: 120, color: 'linear-gradient(135deg, #E8F5E8, #C8E6C9)', delay: 7 },
    { size: 60, color: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', delay: 14 },
    { size: 100, color: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)', delay: 3 },
    { size: 90, color: 'linear-gradient(135deg, #E8F5E8, #A5D6A7)', delay: 10 },
  ];

  return (
    <div className="floating-shapes">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="floating-shape"
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.color,
            position: 'absolute',
            borderRadius: '50%',
            opacity: 0.1,
          }}
          animate={{
            x: mousePosition.x * 0.02 * (index + 1),
            y: mousePosition.y * 0.02 * (index + 1),
            rotate: [0, 360],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 30 },
            y: { type: 'spring', stiffness: 50, damping: 30 },
            rotate: { duration: 20 + shape.delay, repeat: Infinity, ease: 'linear' },
          }}
          initial={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;