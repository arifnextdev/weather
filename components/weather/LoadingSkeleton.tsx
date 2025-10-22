import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from './Skeleton';

export const LoadingSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Skeleton width={40} height={40} borderRadius={20} style={styles.iconSkeleton} />
        <Skeleton width={180} height={24} borderRadius={12} style={styles.locationSkeleton} />
      </View>

      <View style={styles.mainCard}>
        <Skeleton width={140} height={140} borderRadius={70} style={styles.weatherIconSkeleton} />
        <Skeleton width={200} height={100} borderRadius={20} style={styles.tempSkeleton} />
        <View style={styles.quickStats}>
          <Skeleton width={100} height={70} borderRadius={16} style={styles.statSkeleton} />
          <Skeleton width={100} height={70} borderRadius={16} style={styles.statSkeleton} />
          <Skeleton width={100} height={70} borderRadius={16} style={styles.statSkeleton} />
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Skeleton width={160} height={28} borderRadius={14} style={styles.sectionTitle} />
        <View style={styles.detailsList}>
          <Skeleton width="100%" height={80} borderRadius={20} style={styles.detailCard} />
          <Skeleton width="100%" height={80} borderRadius={20} style={styles.detailCard} />
          <Skeleton width="100%" height={80} borderRadius={20} style={styles.detailCard} />
          <Skeleton width="100%" height={80} borderRadius={20} style={styles.detailCard} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  iconSkeleton: {
    marginRight: 8,
  },
  locationSkeleton: {
    marginLeft: 8,
  },
  mainCard: {
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  weatherIconSkeleton: {
    marginBottom: 24,
  },
  tempSkeleton: {
    marginBottom: 28,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  statSkeleton: {
    flex: 1,
  },
  detailsSection: {
    marginTop: 24,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    marginBottom: 20,
    marginLeft: 4,
  },
  detailsList: {
    gap: 12,
  },
  detailCard: {
    marginVertical: 0,
  },
});
