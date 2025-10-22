import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getShortDayName, formatTemperature } from '@/utils/weatherHelpers';
import { weatherApi } from '@/services/weatherApi';

interface ForecastCardProps {
  date: number;
  icon: string;
  tempMax: number;
  tempMin: number;
  condition: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  icon,
  tempMax,
  tempMin,
  condition,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.day}>{getShortDayName(date)}</Text>
      <Image
        source={{ uri: weatherApi.getWeatherIconUrl(icon) }}
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={styles.tempContainer}>
        <Text style={styles.tempMax}>{formatTemperature(tempMax)}</Text>
        <Text style={styles.tempMin}>{formatTemperature(tempMin)}</Text>
      </View>
      <Text style={styles.condition} numberOfLines={1}>
        {condition}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 4,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  tempMax: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  tempMin: {
    fontSize: 18,
    fontWeight: '500',
    color: '#999',
  },
  condition: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});
