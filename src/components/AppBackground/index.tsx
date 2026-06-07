import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../constants/colors';
import { styles } from './styles';

export const AppBackground = ({ children }: PropsWithChildren) => (
  <View style={styles.container}>
    <LinearGradient
      colors={[colors.background, '#111D35', colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.baseGradient}
    />
    <LinearGradient
      colors={['rgba(30,136,255,0.18)', 'rgba(122,92,255,0.10)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.glowGradient}
    />
    {children}
  </View>
);
