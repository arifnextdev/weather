import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Cloud, Droplets, Wind, Eye, Sunrise, Sunset, Gauge, MapPin } from 'lucide-react-native';
import { AnimatedBackground } from '@/components/weather/AnimatedBackground';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherDetail } from '@/components/weather/WeatherDetail';
import { LoadingSkeleton } from '@/components/weather/LoadingSkeleton';
import { weatherApi } from '@/services/weatherApi';
import { locationService } from '@/services/locationService';
import { WeatherData } from '@/types/weather';
import { getWeatherGradient, formatTime } from '@/utils/weatherHelpers';

export default function HomeScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState('');

  const fetchWeatherData = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      
      if (!location) {
        Alert.alert(
          'Location Access Required',
          'Please enable location access to get weather information for your area.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      setLocationName(location.city || 'Unknown Location');
      
      const weatherData = await weatherApi.getCurrentWeather(
        location.latitude,
        location.longitude
      );
      
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
  };

  const gradientColors = weather
    ? getWeatherGradient(weather.weather[0].main)
    : ['#4A90E2', '#87CEEB', '#FFD700'] as const;

  if (loading) {
    return (
      <AnimatedBackground colors={gradientColors}>
        <StatusBar style="dark" />
        <LoadingSkeleton />
      </AnimatedBackground>
    );
  }

  if (!weather) {
    return (
      <AnimatedBackground colors={gradientColors}>
        <StatusBar style="dark" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to fetch weather data</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchWeatherData}>
            <Text style={styles.retryText}>RETRY</Text>
          </TouchableOpacity>
        </View>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground colors={gradientColors}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
      >
        <View style={styles.header}>
          <Text style={styles.locationText}>{locationName}</Text>
        </View>

        <WeatherCard
          temperature={weather.main.temp}
          condition={weather.weather[0].description}
          icon={weather.weather[0].icon}
          location={weather.name}
          feelsLike={weather.main.feels_like}
          humidity={weather.main.humidity}
          windSpeed={weather.wind.speed}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>DETAILS</Text>
          
          <WeatherDetail
            icon={Droplets}
            label="Humidity"
            value={`${weather.main.humidity}%`}
            iconColor="#4A90E2"
          />
          
          <WeatherDetail
            icon={Wind}
            label="Wind Speed"
            value={`${weather.wind.speed.toFixed(1)} m/s`}
            iconColor="#87CEEB"
          />
          
          <WeatherDetail
            icon={Gauge}
            label="Pressure"
            value={`${weather.main.pressure} hPa`}
            iconColor="#9B59B6"
          />
          
          <WeatherDetail
            icon={Eye}
            label="Visibility"
            value={`${(weather.visibility / 1000).toFixed(1)} km`}
            iconColor="#3498DB"
          />
          
          <WeatherDetail
            icon={Cloud}
            label="Cloudiness"
            value={`${weather.clouds.all}%`}
            iconColor="#95A5A6"
          />
          
          <WeatherDetail
            icon={Sunrise}
            label="Sunrise"
            value={formatTime(weather.sys.sunrise)}
            iconColor="#F39C12"
          />
          
          <WeatherDetail
            icon={Sunset}
            label="Sunset"
            value={formatTime(weather.sys.sunset)}
            iconColor="#E74C3C"
          />
        </View>
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 1,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000000',
  },
  retryText: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 2,
  },
});
