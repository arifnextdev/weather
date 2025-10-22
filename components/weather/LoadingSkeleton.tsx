import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from './Skeleton';

export const LoadingSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton width={200} height={32} style={styles.locationSkeleton} />
        <Skeleton width={150} height={20} style={styles.conditionSkeleton} />
      </View>

      <View style={styles.mainCard}>
        <Skeleton width={120} height={120} borderRadius={60} style={styles.iconSkeleton} />
        <Skeleton width={150} height={80} style={styles.tempSkeleton} />
      </View>

      <View style={styles.details}>
        <Skeleton width={100} height={60} style={styles.detailSkeleton} />
        <Skeleton width={100} height={60} style={styles.detailSkeleton} />
        <Skeleton width={100} height={60} style={styles.detailSkeleton} />
      </View>

      <View style={styles.forecast}>
        <Skeleton width={120} height={180} style={styles.forecastCard} />
        <Skeleton width={120} height={180} style={styles.forecastCard} />
        <Skeleton width={120} height={180} style={styles.forecastCard} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  locationSkeleton: {
    marginBottom: 12,
  },
  conditionSkeleton: {
    marginBottom: 8,
  },
  mainCard: {
    alignItems: 'center',
    marginVertical: 24,
  },
  iconSkeleton: {
    marginBottom: 16,
  },
  tempSkeleton: {
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  detailSkeleton: {
    marginHorizontal: 8,
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  forecastCard: {
    marginHorizontal: 4,
  },
});
