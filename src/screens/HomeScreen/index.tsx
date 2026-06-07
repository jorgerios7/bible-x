import { Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Chip, ProgressBar } from 'react-native-paper';

import { GlassCard } from '../../components/GlassCard';
import { GradientButton } from '../../components/GradientButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { VerseCard } from '../../components/VerseCard';
import { colors } from '../../constants/colors';
import { featuredStudies, readingPlans } from '../../constants/mockData';
import { bibleService } from '../../services/bible/bibleService';
import { useAuthStore } from '../../store/authStore';
import { useBibleStore } from '../../store/bibleStore';
import type { MainTabParamList, RootStackParamList } from '../../types';
import { formatPercent } from '../../utils/format';
import { styles } from './styles';

type HomeNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>();
  const profile = useAuthStore((state) => state.profile);
  const recentReadings = useBibleStore((state) => state.recentReadings);
  const verseOfDay = bibleService.getVerseOfDay();

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.kicker}>Bible X</Text>
          <Text style={styles.title}>Olá, {profile?.name?.split(' ')[0] ?? 'Jorge'}</Text>
          <Text style={styles.subtitle}>Um painel de estudo bíblico com leitura, IA, planos e anotações.</Text>
        </View>
        <GradientButton label="Conversar com IA" icon="creation-outline" onPress={() => navigation.navigate('AIChat')} />
      </View>

      <SectionHeader title="Versículo do dia" subtitle="Uma passagem para abrir seu estudo." />
      <VerseCard verse={verseOfDay} />

      <View style={styles.quickGrid}>
        <GlassCard style={styles.quickCard} onPress={() => navigation.navigate('Bible')}>
          <MaterialCommunityIcons name="book-open-variant" size={24} color={colors.primary} />
          <Text style={styles.quickTitle}>Ler Bíblia</Text>
        </GlassCard>
        <GlassCard style={styles.quickCard} onPress={() => navigation.navigate('Search')}>
          <MaterialCommunityIcons name="text-search" size={24} color={colors.secondary} />
          <Text style={styles.quickTitle}>Pesquisar</Text>
        </GlassCard>
        <GlassCard style={styles.quickCard} onPress={() => navigation.navigate('Favorites')}>
          <MaterialCommunityIcons name="heart-outline" size={24} color={colors.accentRed} />
          <Text style={styles.quickTitle}>Favoritos</Text>
        </GlassCard>
        <GlassCard style={styles.quickCard} onPress={() => navigation.navigate('Studies')}>
          <MaterialCommunityIcons name="school-outline" size={24} color={colors.accentOrange} />
          <Text style={styles.quickTitle}>Estudos</Text>
        </GlassCard>
      </View>

      <SectionHeader title="Últimos estudos" subtitle="Continue por temas, personagens ou livros." />
      {featuredStudies.slice(0, 2).map((study) => (
        <GlassCard key={study.id}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{study.title}</Text>
            <Chip compact style={styles.categoryChip} textStyle={styles.categoryText}>
              {study.category}
            </Chip>
          </View>
          <Text style={styles.cardDescription}>{study.description}</Text>
        </GlassCard>
      ))}

      <SectionHeader title="Histórico recente" />
      <GlassCard>
        {recentReadings.length ? (
          recentReadings.slice(0, 3).map((reading) => (
            <Text key={`${reading.bookAbbrev}-${reading.chapter}`} style={styles.historyText}>
              {reading.book} {reading.chapter}
            </Text>
          ))
        ) : (
          <Text style={styles.cardDescription}>Comece por João 3 ou pesquise um tema para criar histórico.</Text>
        )}
      </GlassCard>

      <SectionHeader title="Plano de leitura" />
      {readingPlans.slice(0, 1).map((plan) => (
        <GlassCard key={plan.id}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{plan.title}</Text>
            <Text style={styles.percent}>{formatPercent(plan.progress)}</Text>
          </View>
          <Text style={styles.cardDescription}>{plan.description}</Text>
          <ProgressBar progress={plan.progress / 100} color={colors.primary} style={styles.progress} />
        </GlassCard>
      ))}
    </ScreenContainer>
  );
};
