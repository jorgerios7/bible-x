import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../constants/colors';
import { styles } from './styles';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type GradientButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'subtle';
  style?: StyleProp<ViewStyle>;
};

export const GradientButton = ({
  label,
  onPress,
  icon,
  disabled,
  loading,
  variant = 'primary',
  style,
}: GradientButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [styles.wrapper, pressed && styles.pressed, disabled && styles.disabled, style]}
  >
    <LinearGradient
      colors={variant === 'primary' ? colors.gradient : ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.06)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {loading ? (
        <ActivityIndicator color={colors.textPrimary} />
      ) : (
        <View style={styles.content}>
          {icon ? <MaterialCommunityIcons name={icon} size={20} color={colors.textPrimary} /> : null}
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </LinearGradient>
  </Pressable>
);
