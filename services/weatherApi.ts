import axios from 'axios';
import { WeatherData, ForecastData } from '@/types/weather';

// Replace with your OpenWeather API key
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  /**
   * Get current weather by coordinates
   */
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  /**
   * Get 5-day weather forecast by coordinates
   */
  getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
    try {
      const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  /**
   * Get current weather by city name
   */
  getCurrentWeatherByCity: async (city: string): Promise<WeatherData> => {
    try {
      const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },

  /**
   * Get weather icon URL
   */
  getWeatherIconUrl: (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  },
};
