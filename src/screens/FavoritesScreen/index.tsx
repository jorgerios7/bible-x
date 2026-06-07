import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { EmptyState } from '../../components/EmptyState';
import { GlassCard } from '../../components/GlassCard';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites';
import { styles } from './styles';

export const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <ScreenContainer>
      <SectionHeader title="Favoritos" subtitle="Versículos, estudos e conversas salvos para voltar depois." />
      {favorites.length ? (
        favorites.map((favorite) => (
          <GlassCard key={favorite.id}>
            <View style={styles.row}>
              <View style={styles.textGroup}>
                <Text style={styles.kind}>{favorite.kind}</Text>
                <Text style={styles.title}>{favorite.title}</Text>
                {favorite.subtitle ? <Text style={styles.subtitle}>{favorite.subtitle}</Text> : null}
              </View>
              <IconButton
                icon="trash-can-outline"
                iconColor={colors.textSecondary}
                onPress={() => removeFavorite(favorite.id).catch(() => undefined)}
              />
            </View>
          </GlassCard>
        ))
      ) : (
        <EmptyState
          icon="heart-outline"
          title="Nenhum favorito ainda"
          description="Toque no coração em versículos, estudos ou conversas para salvar aqui."
        />
      )}
    </ScreenContainer>
  );
};
