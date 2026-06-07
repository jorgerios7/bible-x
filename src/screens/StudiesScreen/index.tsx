import { Text, View } from 'react-native';
import { Chip, IconButton } from 'react-native-paper';

import { GlassCard } from '../../components/GlassCard';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { colors } from '../../constants/colors';
import { featuredStudies } from '../../constants/mockData';
import { useFavorites } from '../../hooks/useFavorites';
import { nowIso } from '../../utils/date';
import { styles } from './styles';

export const StudiesScreen = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Estudos"
        subtitle="Estudos temáticos, por personagem e por livro com referências para aprofundar."
      />
      <View style={styles.categoryRow}>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          Temáticos
        </Chip>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          Personagens
        </Chip>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          Livros
        </Chip>
      </View>
      {featuredStudies.map((study) => {
        const favoriteId = `study-${study.id}`;
        const favorite = isFavorite(favoriteId);

        return (
          <GlassCard key={study.id}>
            <View style={styles.cardHeader}>
              <View style={styles.titleGroup}>
                <Text style={styles.cardTitle}>{study.title}</Text>
                <Text style={styles.meta}>
                  {study.category} • {study.estimatedMinutes} min
                </Text>
              </View>
              <IconButton
                icon={favorite ? 'bookmark' : 'bookmark-outline'}
                iconColor={favorite ? colors.primary : colors.textSecondary}
                onPress={() => {
                  if (favorite) {
                    removeFavorite(favoriteId).catch(() => undefined);
                    return;
                  }

                  addFavorite({
                    id: favoriteId,
                    kind: 'study',
                    title: study.title,
                    subtitle: study.description,
                    createdAt: nowIso(),
                  }).catch(() => undefined);
                }}
              />
            </View>
            <Text style={styles.description}>{study.description}</Text>
            <View style={styles.references}>
              {study.references.map((reference) => (
                <Chip key={reference} compact style={styles.referenceChip} textStyle={styles.referenceText}>
                  {reference}
                </Chip>
              ))}
            </View>
          </GlassCard>
        );
      })}
    </ScreenContainer>
  );
};
