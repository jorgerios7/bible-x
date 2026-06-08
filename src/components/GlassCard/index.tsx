import { PropsWithChildren } from 'react';
import { Pressable, View, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native';

import { styles } from './styles';

type GlassCardProps = PropsWithChildren<{
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}>;

export const GlassCard = ({ children, containerStyle, onPress, style }: GlassCardProps) => {
  const content = <View style={[styles.card, onPress ? styles.pressableCard : null, style]}>{children}</View>;

  if (!onPress) {
    return containerStyle ? <View style={containerStyle}>{content}</View> : content;
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
      style={containerStyle}
    >
      {content}
    </Pressable>
  );
};
