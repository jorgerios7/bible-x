import { Text, View } from 'react-native';

import { AppBackground } from '../../components/AppBackground';
import { GradientLogo } from '../../components/GradientLogo';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { styles } from './styles';

export const SplashScreen = () => (
  <AppBackground>
    <View style={styles.container}>
      <GradientLogo />
      <View style={styles.loading}>
        <Text style={styles.caption}>Preparando seu ambiente de estudo</Text>
        <LoadingSkeleton rows={2} />
      </View>
    </View>
  </AppBackground>
);
