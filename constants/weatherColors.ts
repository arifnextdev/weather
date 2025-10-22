/**
 * Weather-themed color constants
 */

export const WeatherColors = {
  // Primary weather gradients
  clear: ['#4A90E2', '#87CEEB', '#FFD700'] as const,
  cloudy: ['#606c88', '#3f4c6b', '#8e9eab'] as const,
  rainy: ['#2c3e50', '#3498db', '#34495e'] as const,
  thunderstorm: ['#141E30', '#243B55', '#2c3e50'] as const,
  snowy: ['#E6DADA', '#F0F8FF', '#B0C4DE'] as const,
  misty: ['#757F9A', '#D7DDE8', '#B0C4DE'] as const,
  default: ['#56CCF2', '#2F80ED', '#4A90E2'] as const,

  // UI colors
  primary: '#4A90E2',
  secondary: '#87CEEB',
  accent: '#FFD700',
  
  // Text colors
  textLight: '#FFFFFF',
  textDark: '#1A1A1A',
  textGray: '#666666',
  textMuted: '#999999',
  
  // Background colors
  cardBackground: 'rgba(255, 255, 255, 0.95)',
  overlayLight: 'rgba(255, 255, 255, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.3)',
  
  // Status colors
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
  
  // Weather condition colors
  humidity: '#4A90E2',
  wind: '#87CEEB',
  pressure: '#9B59B6',
  visibility: '#3498DB',
  cloudiness: '#95A5A6',
  sunrise: '#F39C12',
  sunset: '#E74C3C',
};

export const WeatherIcons = {
  // Weather condition emoji fallbacks
  clear: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  drizzle: '🌦️',
  thunderstorm: '⛈️',
  snow: '❄️',
  mist: '🌫️',
  fog: '🌫️',
  wind: '💨',
  hot: '🔥',
  cold: '🧊',
};
