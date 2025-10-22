import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedBackgroundProps {
  colors: string[];
  children: React.ReactNode;
}

const { height } = Dimensions.get('window');

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  colors,
  children,
}) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animation.value,
      [0, 1],
      [0, -20]
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <LinearGradient
      colors={colors}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {children}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
