import * as Location from 'expo-location';
import { LocationData } from '@/types/weather';

export const locationService = {
  /**
   * Request location permissions
   */
  requestPermissions: async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  },

  /**
   * Get current location
   */
  getCurrentLocation: async (): Promise<LocationData | null> => {
    try {
      const hasPermission = await locationService.requestPermissions();
      
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Get address information
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        city: address?.city || address?.subregion || 'Unknown',
        country: address?.country || 'Unknown',
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  },

  /**
   * Check if location permissions are granted
   */
  checkPermissions: async (): Promise<boolean> => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking location permissions:', error);
      return false;
    }
  },
};
