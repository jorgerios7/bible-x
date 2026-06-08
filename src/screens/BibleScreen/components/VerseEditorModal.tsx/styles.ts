import { colors } from "@/constants/colors";
import { radius, spacing } from "@/constants/layout";
import { typography } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    editorModalWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        margin: 0,
    },
    editorModal: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.surface,
    },
    editorKeyboardContainer: {
        flex: 1,
        gap: spacing.md,
    },
    editorHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.sm,
    },
    editorTitleGroup: {
        flex: 1,
        gap: spacing.xs,
    },
    editorTitle: {
        ...typography.title,
        fontSize: 20,
    },
    editorSubtitle: {
        ...typography.subtitle,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    editorInput: {
        flex: 1,
        minHeight: 200,
        backgroundColor: 'rgba(15, 23, 42, 0.64)',
        textAlignVertical: 'top',
    },
    editorInputContent: {
        paddingTop: spacing.lg,
    },
    editorInputOutline: {
        borderRadius: radius.lg,
    },
    editorActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: spacing.sm,
    },
});