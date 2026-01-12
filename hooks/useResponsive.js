import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

const BASE_WIDTH = 375;

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isTablet = width >= 768;

  const scale = (size) => {
    const scaleFactor = width / BASE_WIDTH;
    return isTablet ? Math.min(size * scaleFactor, size * 1.3) : size * scaleFactor;
  };

  const spacing = {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
  };

  const fontSize = {
    sm: scale(12),
    md: scale(16),
    lg: scale(18),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
  };

  return {
    width,
    height,
    isTablet,
    scale,
    spacing,
    fontSize,
  };
};