import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatTemperature, capitalizeWords } from '@/utils/weatherHelpers';
import { weatherApi } from '@/services/weatherApi';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  gradient?: string[];
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  condition,
  icon,
  location,
  feelsLike,
  humidity,
  windSpeed,
  gradient = ['#4A90E2', '#87CEEB'],
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.condition}>{capitalizeWords(condition)}</Text>
      </View>

      <View style={styles.mainContent}>
        <Image
          source={{ uri: weatherApi.getWeatherIconUrl(icon) }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>{formatTemperature(temperature)}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{formatTemperature(feelsLike)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{windSpeed.toFixed(1)} m/s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  condition: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: 16,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#1A1A1A',
    marginTop: -8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});
