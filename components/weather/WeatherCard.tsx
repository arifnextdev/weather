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

      <View style={styles.divider} />

      <View style={styles.mainContent}>
        <Text style={styles.temperature}>{formatTemperature(temperature)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>FEELS LIKE</Text>
          <Text style={styles.detailValue}>{formatTemperature(feelsLike)}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>HUMIDITY</Text>
          <Text style={styles.detailValue}>{humidity}%</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>WIND</Text>
          <Text style={styles.detailValue}>{windSpeed.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 32,
    borderWidth: 1,
    borderColor: '#000000',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  location: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  condition: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 24,
  },
  mainContent: {
    alignItems: 'flex-start',
    marginVertical: 24,
  },
  temperature: {
    fontSize: 96,
    fontWeight: '200',
    color: '#000000',
    letterSpacing: -4,
    lineHeight: 96,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 8,
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  detailValue: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '300',
    letterSpacing: 0,
  },
});
