import { PropsWithChildren } from 'react';
import { RefreshControl, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
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
}: ScreenContainerProps) => {
  const insets = useSafeAreaInsets();
  const safePadding = {
    paddingTop: spacing.xl + insets.top,
    paddingBottom: spacing.xl + insets.bottom,
  };

  return (
    <AppBackground>
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, safePadding, contentContainerStyle]}
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
        <View style={[styles.content, styles.flexContent, safePadding, contentContainerStyle]}>{children}</View>
      )}
    </AppBackground>
  );
};
