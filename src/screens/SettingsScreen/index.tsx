import { Text, View } from 'react-native';
import { IconButton, Switch } from 'react-native-paper';

import { GlassCard } from '../../components/GlassCard';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { colors } from '../../constants/colors';
import { useSettingsStore } from '../../store/settingsStore';
import { styles } from './styles';

export const SettingsScreen = () => {
  const {
    fontScale,
    notificationsEnabled,
    semanticSearchEnabled,
    setFontScale,
    setNotificationsEnabled,
    setSemanticSearchEnabled,
  } = useSettingsStore();

  return (
    <ScreenContainer>
      <SectionHeader title="Configurações" subtitle="Ajuste leitura, notificações e recursos inteligentes." />

      <GlassCard>
        <View style={styles.settingRow}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>Tema</Text>
            <Text style={styles.description}>Escuro premium Bible X</Text>
          </View>
          <Switch value color={colors.primary} disabled />
        </View>
      </GlassCard>

      <GlassCard>
        <View style={styles.settingRow}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>Fonte</Text>
            <Text style={styles.description}>Tamanho atual {fontScale.toFixed(1)}x</Text>
          </View>
          <View style={styles.stepper}>
            <IconButton
              icon="minus"
              iconColor={colors.textPrimary}
              onPress={() => setFontScale(Math.max(0.8, Number((fontScale - 0.1).toFixed(1))))}
            />
            <IconButton
              icon="plus"
              iconColor={colors.textPrimary}
              onPress={() => setFontScale(Math.min(1.4, Number((fontScale + 0.1).toFixed(1))))}
            />
          </View>
        </View>
      </GlassCard>

      <GlassCard>
        <View style={styles.settingRow}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>Notificações</Text>
            <Text style={styles.description}>Lembretes de leitura e planos</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            color={colors.primary}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </GlassCard>

      <GlassCard>
        <View style={styles.settingRow}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>Busca semântica</Text>
            <Text style={styles.description}>Relaciona temas a passagens bíblicas</Text>
          </View>
          <Switch
            value={semanticSearchEnabled}
            color={colors.secondary}
            onValueChange={setSemanticSearchEnabled}
          />
        </View>
      </GlassCard>
    </ScreenContainer>
  );
};
