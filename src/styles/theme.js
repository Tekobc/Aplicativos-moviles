import { Platform } from 'react-native';

export const theme = {
    colors: {
        primary: '#4F46E5', // Indigo vibrante y moderno
        primaryDark: '#3730A3',
        primaryLight: '#EEF2FF',
        primaryBorder: '#C7D2FE',
        accent: '#06B6D4',
        accentLight: '#ECFEFF',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        inputBackground: '#F8FAFC',
        text: '#0F172A',
        textSecondary: '#475569',
        textMuted: '#94A3B8',
        border: '#E2E8F0',
        borderHover: '#CBD5E1',
        borderFocus: '#4F46E5',
        success: '#10B981',
        successLight: '#ECFDF5',
        successDark: '#047857',
        successBorder: '#A7F3D0',
        danger: '#EF4444',
        dangerLight: '#FEF2F2',
        dangerDark: '#B91C1C',
        dangerBorder: '#FECACA',
        warning: '#F59E0B',
        warningLight: '#FFFBEB',
        white: '#FFFFFF',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 9999,
    },
    shadows: {
        sm: Platform.select({
            ios: {
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.08)',
            },
        }),
        md: Platform.select({
            ios: {
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.08,
                shadowRadius: 14,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
            },
        }),
        primary: Platform.select({
            ios: {
                shadowColor: '#4f46e5',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.35)',
            },
        }),
        danger: Platform.select({
            ios: {
                shadowColor: '#ef4444',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.25)',
            },
        }),
    },
};
