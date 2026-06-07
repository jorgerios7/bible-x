import { PropsWithChildren } from 'react';
import { Pressable, View, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native';

import { styles } from './styles';

type GlassCardProps = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}>;

export const GlassCard = ({ children, onPress, style }: GlassCardProps) => {
  const content = <View style={[styles.card, style]}>{children}</View>;

  if (!onPress) {
    return content;
  }

  return (
    <Pressable onPress={onPress} android_ripple={{ color: 'rgba(255,255,255,0.08)' }}>
      {content}
    </Pressable>
  );
};
