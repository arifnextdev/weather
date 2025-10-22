import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AnimatedBackground } from '@/components/weather/AnimatedBackground';
import { ForecastCard } from '@/components/weather/ForecastCard';
import { LoadingSkeleton } from '@/components/weather/LoadingSkeleton';
import { weatherApi } from '@/services/weatherApi';
import { locationService } from '@/services/locationService';
import { ForecastData } from '@/types/weather';
import { getWeatherGradient, capitalizeWords } from '@/utils/weatherHelpers';

interface DailyForecast {
  date: number;
  icon: string;
  tempMax: number;
  tempMin: number;
  condition: string;
}

export default function ForecastScreen() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);

  const processForecastData = (data: ForecastData): DailyForecast[] => {
    const dailyData: { [key: string]: DailyForecast } = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: item.dt,
          icon: item.weather[0].icon,
          tempMax: item.main.temp_max,
          tempMin: item.main.temp_min,
          condition: item.weather[0].description,
        };
      } else {
        dailyData[dateKey].tempMax = Math.max(dailyData[dateKey].tempMax, item.main.temp_max);
        dailyData[dateKey].tempMin = Math.min(dailyData[dateKey].tempMin, item.main.temp_min);
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const fetchForecastData = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      
      if (!location) {
        Alert.alert(
          'Location Access Required',
          'Please enable location access to get forecast information.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      const forecastData = await weatherApi.getForecast(
        location.latitude,
        location.longitude
      );
      
      setForecast(forecastData);
      setDailyForecasts(processForecastData(forecastData));
    } catch (error) {
      console.error('Error fetching forecast:', error);
      Alert.alert('Error', 'Failed to fetch forecast data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchForecastData();
  };

  const gradientColors: readonly [string, string, ...string[]] = forecast
    ? getWeatherGradient(forecast.list[0].weather[0].main)
    : ['#4A90E2', '#87CEEB', '#FFD700'] as const;

  if (loading) {
    return (
      <AnimatedBackground colors={gradientColors}>
        <StatusBar style="dark" />
        <LoadingSkeleton />
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
          <Text style={styles.headerTitle}>FORECAST</Text>
        </View>

        {forecast && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{forecast.city.name}</Text>
          </View>
        )}

        <View style={styles.forecastContainer}>
          {dailyForecasts.map((day, index) => (
            <ForecastCard
              key={index}
              date={day.date}
              icon={day.icon}
              tempMax={day.tempMax}
              tempMin={day.tempMin}
              condition={capitalizeWords(day.condition)}
            />
          ))}
        </View>

        {forecast && (
          <View style={styles.hourlyContainer}>
            <Text style={styles.sectionTitle}>HOURLY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyScrollContent}>
              {forecast.list.slice(0, 8).map((item, index) => {
                const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <View key={index} style={styles.hourlyCard}>
                    <Text style={styles.hourlyTime}>{time}</Text>
                    <View style={styles.hourlyDivider} />
                    <Text style={styles.hourlyTemp}>{Math.round(item.main.temp)}°</Text>
                    <Text style={styles.hourlyWind}>{item.wind.speed.toFixed(1)} m/s</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
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
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  locationContainer: {
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  forecastContainer: {
    paddingHorizontal: 8,
  },
  hourlyContainer: {
    marginTop: 32,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 3,
  },
  hourlyScrollContent: {
    paddingRight: 20,
  },
  hourlyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#000000',
  },
  hourlyDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  hourlyTime: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  hourlyTemp: {
    fontSize: 28,
    fontWeight: '200',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -1,
  },
  hourlyWind: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});
