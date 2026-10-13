import { Platform, StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.sm,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: theme.colors.text,
    },
    headerSubtitle: {
        fontSize: 12,
        color: theme.colors.textMuted,
        fontWeight: '500',
    },
    countBadge: {
        backgroundColor: theme.colors.primaryLight,
        borderColor: theme.colors.primaryBorder,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.full,
    },
    countText: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    formCard: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: theme.borderRadius.lg,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        ...theme.shadows.sm,
    },
    input: {
        flex: 1,
        color: theme.colors.text,
        fontSize: 15,
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 4,
        ...theme.shadows.primary,
    },
    addButtonPressed: {
        backgroundColor: theme.colors.primaryDark,
        transform: [{ scale: 0.98 }],
    },
    addButtonDisabled: {
        opacity: 0.6,
    },
    addButtonText: {
        color: theme.colors.white,
        fontWeight: '700',
        fontSize: 14,
    },
    filtersContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
    },
    filterChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    filterChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
    filterChipTextActive: {
        color: theme.colors.white,
    },
    list: {
        paddingBottom: 30,
        gap: 10,
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: theme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 14,
        color: theme.colors.textMuted,
        textAlign: 'center',
        maxWidth: 260,
        lineHeight: 20,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: theme.borderRadius.lg,
        padding: 14,
        ...theme.shadows.sm,
    },
    taskCardCompleted: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        opacity: 0.85,
    },
    checkboxButton: {
        marginRight: 12,
        padding: 2,
    },
    taskTextContainer: {
        flex: 1,
        marginRight: 8,
    },
    taskTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 4,
    },
    taskTitleCompleted: {
        textDecorationLine: 'line-through',
        color: theme.colors.textMuted,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.full,
    },
    statusBadgePending: {
        backgroundColor: theme.colors.warningLight,
    },
    statusBadgeCompleted: {
        backgroundColor: theme.colors.successLight,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },
    statusTextPending: {
        color: theme.colors.warning,
    },
    statusTextCompleted: {
        color: theme.colors.successDark,
    },
    deleteButton: {
        padding: 8,
        borderRadius: theme.borderRadius.sm,
    },
    deleteButtonPressed: {
        backgroundColor: theme.colors.dangerLight,
    },
    loader: {
        marginTop: 60,
    },
});
