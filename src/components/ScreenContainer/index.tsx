import { PropsWithChildren } from 'react';
import { RefreshControl, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '../../constants/colors';
import { AppBackground } from '../AppBackground';
import { styles } from './styles';

type ScreenContainerProps = PropsWithChildren<{
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

export const ScreenContainer = ({
  children,
  scroll = true,
  contentContainerStyle,
  refreshing,
  onRefresh,
}: ScreenContainerProps) => (
  <AppBackground>
    {scroll ? (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={Boolean(refreshing)}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary, colors.secondary]}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.content, styles.flexContent, contentContainerStyle]}>{children}</View>
    )}
  </AppBackground>
);
