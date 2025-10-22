import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface WeatherDetailProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconColor?: string;
}

export const WeatherDetail: React.FC<WeatherDetailProps> = ({
  icon: Icon,
  label,
  value,
  iconColor = '#4A90E2',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon size={24} color={iconColor} strokeWidth={2} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});
