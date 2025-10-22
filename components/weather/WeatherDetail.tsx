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
        <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#000000',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#000000',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  value: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '300',
    letterSpacing: 0,
  },
});
