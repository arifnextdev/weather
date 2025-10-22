/**
 * Format temperature with degree symbol
 */
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

/**
 * Format date from timestamp
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time from timestamp
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get day name from timestamp
 */
export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get short day name from timestamp
 */
export const getShortDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get weather condition color
 */
export const getWeatherColor = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear')) return '#FFD700';
  if (conditionLower.includes('cloud')) return '#B0C4DE';
  if (conditionLower.includes('rain')) return '#4682B4';
  if (conditionLower.includes('thunder')) return '#483D8B';
  if (conditionLower.includes('snow')) return '#F0F8FF';
  if (conditionLower.includes('mist') || conditionLower.includes('fog')) return '#D3D3D3';
  
  return '#87CEEB'; // Default sky blue
};

/**
 * Get weather gradient colors based on condition
 */
export const getWeatherGradient = (condition: string): string[] => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear')) {
    return ['#4A90E2', '#87CEEB', '#FFD700'];
  }
  if (conditionLower.includes('cloud')) {
    return ['#606c88', '#3f4c6b', '#8e9eab'];
  }
  if (conditionLower.includes('rain')) {
    return ['#2c3e50', '#3498db', '#34495e'];
  }
  if (conditionLower.includes('thunder')) {
    return ['#141E30', '#243B55', '#2c3e50'];
  }
  if (conditionLower.includes('snow')) {
    return ['#E6DADA', '#F0F8FF', '#B0C4DE'];
  }
  if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return ['#757F9A', '#D7DDE8', '#B0C4DE'];
  }
  
  return ['#56CCF2', '#2F80ED', '#4A90E2']; // Default gradient
};

/**
 * Convert wind speed to direction
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Get UV index description
 */
export const getUVIndexDescription = (uvIndex: number): string => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

/**
 * Get air quality description
 */
export const getAirQualityDescription = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};
