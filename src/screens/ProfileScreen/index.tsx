import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar, IconButton } from 'react-native-paper';

import { GlassCard } from '../../components/GlassCard';
import { GradientButton } from '../../components/GradientButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { StatChart } from '../../components/StatChart';
import { colors } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import { useReadingStats } from '../../hooks/useReadingStats';
import type { RootStackParamList } from '../../types';
import { styles } from './styles';

type ProfileNavigation = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigation>();
  const { profile, firebaseUser, signOut } = useAuth();
  const stats = useReadingStats();
  const displayName = profile?.name ?? firebaseUser?.displayName ?? 'Usuário Bible X';
  const email = profile?.email ?? firebaseUser?.email ?? '';

  const handleSignOut = () => {
    Alert.alert('Sair da conta', 'Deseja encerrar sua sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut().catch(() => undefined) },
    ]);
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Perfil" subtitle="Sua caminhada de leitura e estudo em um só lugar." />
      <GlassCard>
        <View style={styles.profileRow}>
          <Avatar.Text size={62} label={displayName.slice(0, 2).toUpperCase()} color={colors.textPrimary} />
          <View style={styles.profileText}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.cardTitle}>Estatísticas</Text>
        <StatChart data={stats} />
      </GlassCard>

      <GlassCard>
        <View style={styles.menuRow}>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Favoritos</Text>
            <Text style={styles.menuDescription}>Versículos, estudos e conversas salvas</Text>
          </View>
          <IconButton icon="chevron-right" iconColor={colors.textSecondary} onPress={() => navigation.navigate('Favorites')} />
        </View>
        <View style={styles.menuRow}>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Configurações</Text>
            <Text style={styles.menuDescription}>Tema, fonte e notificações</Text>
          </View>
          <IconButton icon="chevron-right" iconColor={colors.textSecondary} onPress={() => navigation.navigate('Settings')} />
        </View>
      </GlassCard>

      <GradientButton label="Sair" icon="logout" variant="subtle" onPress={handleSignOut} />
    </ScreenContainer>
  );
};
