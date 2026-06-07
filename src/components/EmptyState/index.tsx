import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { GradientButton } from '../GradientButton';
import { styles } from './styles';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type EmptyStateProps = {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({ icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <View style={styles.container}>
    <MaterialCommunityIcons name={icon} size={34} color="#CBD5E1" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {actionLabel && onAction ? <GradientButton label={actionLabel} onPress={onAction} variant="subtle" /> : null}
  </View>
);
