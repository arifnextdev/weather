import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, X } from 'lucide-react-native';
import { AnimatedBackground } from '@/components/weather/AnimatedBackground';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { weatherApi } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';
import { getWeatherGradient } from '@/utils/weatherHelpers';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Sydney',
  ]);

  const handleSearch = async (city: string) => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCity(city.trim());
      setWeather(weatherData);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(city.trim())) {
        setRecentSearches([city.trim(), ...recentSearches.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Error searching weather:', error);
      Alert.alert('Error', 'City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = (city: string) => {
    setSearchQuery(city);
    handleSearch(city);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setWeather(null);
  };

  const gradientColors: readonly [string, string, ...string[]] = weather
    ? getWeatherGradient(weather.weather[0].main)
    : ['#4A90E2', '#87CEEB', '#FFD700'] as const;

  return (
    <AnimatedBackground colors={gradientColors}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SEARCH</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter city name"
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearch(searchQuery)}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <X size={18} color="#000000" strokeWidth={1.5} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch(searchQuery)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <Text style={styles.searchButtonText}>SEARCH</Text>
            )}
          </TouchableOpacity>
        </View>

        {!weather && !loading && (
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>POPULAR</Text>
            <View style={styles.recentList}>
              {recentSearches.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentItem}
                  onPress={() => handleRecentSearch(city)}
                >
                  <Text style={styles.recentText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>SEARCHING...</Text>
          </View>
        )}

        {weather && !loading && (
          <View style={styles.resultContainer}>
            <WeatherCard
              temperature={weather.main.temp}
              condition={weather.weather[0].description}
              icon={weather.weather[0].icon}
              location={weather.name}
              feelsLike={weather.main.feels_like}
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
            />

            <View style={styles.additionalInfo}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>COUNTRY</Text>
                <Text style={styles.infoValue}>{weather.sys.country}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>COORDINATES</Text>
                <Text style={styles.infoValue}>
                  {weather.coord.lat.toFixed(2)}°, {weather.coord.lon.toFixed(2)}°
                </Text>
              </View>
            </View>
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
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#000000',
  },
  searchInput: {
    flex: 1,
    height: 56,
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  clearButton: {
    padding: 8,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  searchButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 2,
  },
  recentContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: 3,
  },
  recentList: {
    gap: 12,
  },
  recentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  recentText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 20,
    fontWeight: '400',
    letterSpacing: 2,
  },
  resultContainer: {
    paddingHorizontal: 0,
  },
  additionalInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  infoLabel: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 8,
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0,
  },
});
