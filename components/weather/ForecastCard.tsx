import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <View style={styles.divider} />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 20,
    marginHorizontal: 6,
    marginVertical: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#000000',
  },
  day: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  tempContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tempMax: {
    fontSize: 32,
    fontWeight: '200',
    color: '#000000',
    letterSpacing: -1,
    marginBottom: 4,
  },
  tempMin: {
    fontSize: 18,
    fontWeight: '300',
    color: '#666666',
    letterSpacing: 0,
  },
  condition: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'left',
    fontWeight: '400',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
