import { Button, IconButton, Modal, TextInput } from "react-native-paper";
import { styles } from "./styles";
import { spacing } from "@/constants/layout";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface VerseEditorModalProps {
    editorContent: string;
    editorVisible: boolean;
    onChangeEditorContent: (content: string) => void;
    onShare: (content: string) => void;
    onDismiss: () => void;
}

export function VerseEditorModal({ editorContent, editorVisible, onChangeEditorContent, onShare, onDismiss }: VerseEditorModalProps) {
    const insets = useSafeAreaInsets();
    return (
        <Modal
            visible={editorVisible}
            onDismiss={onDismiss}
            style={styles.editorModalWrapper}
            contentContainerStyle={[
                styles.editorModal,
                {
                    paddingTop: spacing.lg + insets.top,
                    paddingBottom: spacing.lg + insets.bottom,
                },
            ]}
        >
            <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={0}
                style={styles.editorKeyboardContainer}
            >
                <View style={styles.editorHeader}>
                    <View style={styles.editorTitleGroup}>
                        <Text style={styles.editorTitle}>Editor de versículos</Text>
                        <Text style={styles.editorSubtitle}>Escreva notas, organize o texto e compartilhe quando quiser.</Text>
                    </View>
                    <IconButton
                        icon="close"
                        accessibilityLabel="Fechar editor"
                        iconColor={colors.textSecondary}
                        onPress={onDismiss}
                    />
                </View>
                <TextInput
                    mode="outlined"
                    value={editorContent}
                    onChangeText={onChangeEditorContent}
                    multiline
                    textColor={colors.textPrimary}
                    outlineColor={colors.border}
                    activeOutlineColor={colors.primary}
                    placeholder="Escreva suas notas junto dos versículos selecionados..."
                    placeholderTextColor={colors.textDisabled}
                    style={styles.editorInput}
                    contentStyle={styles.editorInputContent}
                    outlineStyle={styles.editorInputOutline}
                />
                <View style={styles.editorActions}>
                    <Button mode="text" textColor={colors.textSecondary} onPress={onDismiss}>
                        Fechar
                    </Button>
                    <Button
                        mode="contained"
                        icon="share-variant"
                        buttonColor={colors.primary}
                        textColor={colors.textPrimary}
                        onPress={() => onShare(editorContent)}
                    >
                        Compartilhar
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
} 