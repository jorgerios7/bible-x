import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { styles } from './styles';

type LoadingSkeletonProps = {
  rows?: number;
};

export const LoadingSkeleton = ({ rows = 3 }: LoadingSkeletonProps) => (
  <View style={styles.container}>
    {Array.from({ length: rows }, (_, index) => (
      <SkeletonRow key={index} index={index} isShort={index === rows - 1} />
    ))}
  </View>
);

const SkeletonRow = ({ index, isShort }: { index: number; isShort: boolean }) => {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withRepeat(withTiming(0.85, { duration: 900 }), -1, true);
    }, index * 90);

    return () => clearTimeout(timer);
  }, [index, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.row, isShort && styles.shortRow, animatedStyle]} />;
};
