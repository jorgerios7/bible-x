import { colors } from "@/constants/colors";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { styles } from "./styles";
import type { Verse } from "../../../../types";

interface SelectionBarProps {
    visible: boolean;
    input: Verse[];
    onClear: () => void;
    onFavoriteVerses: () => void;
    onPressVersesEditor: () => void;
    onShareVerses: () => void;
}

export function SelectionBar({ visible, input, onClear, onFavoriteVerses, onPressVersesEditor, onShareVerses }: SelectionBarProps) {
    if (!visible) return null;

    const versesCount = input.length;
    return (
        <View style={styles.selectionBar}>
            <View style={styles.selectionCounter}>
                <IconButton
                    icon="close-circle-outline"
                    accessibilityLabel="Cancelar seleção"
                    iconColor={colors.textSecondary}
                    size={22}
                    style={styles.cancelSelectionButton}
                    onPress={onClear}
                />

                <Text style={styles.selectionCount}>
                    {versesCount} {versesCount === 1 ? 'versículo selecionado' : 'versículos selecionados'}
                </Text>
            </View>
            <View style={styles.selectionActions}>
                <IconButton
                    icon="heart-outline"
                    accessibilityLabel="Salvar versículos selecionados"
                    mode="contained"
                    containerColor="rgba(255,255,255,0.10)"
                    iconColor={colors.textPrimary}
                    size={22}
                    style={styles.selectionActionButton}
                    onPress={onFavoriteVerses}
                />

                <IconButton
                    icon="note-edit-outline"
                    accessibilityLabel="Editar versículos selecionados"
                    mode="contained"
                    containerColor="rgba(255,255,255,0.10)"
                    iconColor={colors.textPrimary}
                    size={22}
                    style={styles.selectionActionButton}
                    onPress={onPressVersesEditor}
                />
                <IconButton
                    icon="share-variant"
                    accessibilityLabel="Compartilhar versículos selecionados"
                    mode="contained"
                    containerColor={colors.primary}
                    iconColor={colors.textPrimary}
                    size={22}
                    style={styles.selectionActionButton}
                    onPress={onShareVerses}
                />
            </View>
        </View>
    );
}
