import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../constants/colors';
import { styles } from './styles';

type GradientLogoProps = {
  size?: 'sm' | 'lg';
  showName?: boolean;
};

export const GradientLogo = ({ size = 'lg', showName = true }: GradientLogoProps) => (
  <AnimatedLogo size={size} showName={showName} />
);

const AnimatedLogo = ({ size, showName }: Required<GradientLogoProps>) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);
  const scale = useSharedValue(0.94);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
    translateY.value = withTiming(0, { duration: 700 });
    scale.value = withTiming(1, { duration: 700 });
  }, [opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient colors={colors.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mark}>
        <Text style={[styles.markText, size === 'sm' && styles.markTextSmall]}>BX</Text>
      </LinearGradient>
      {showName ? (
        <View style={styles.textGroup}>
          <Text style={[styles.name, size === 'sm' && styles.nameSmall]}>Bible X</Text>
          <Text style={styles.subtitle}>Estudo bíblico com IA</Text>
        </View>
      ) : null}
    </Animated.View>
  );
};
