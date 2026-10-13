import { useEffect, useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../firebase/authService';
import { auth } from '../firebase/firebase';
import { getUser } from '../services/userService';
import { styles } from '../styles/HomeStyles';
import { theme } from '../styles/theme';

export default function HomeScreen({ navigation }) {
    const user = auth.currentUser;
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const data = await getUser(user.uid);
                    if (data?.nombre) {
                        setProfileName(data.nombre);
                    } else if (user.displayName) {
                        setProfileName(user.displayName);
                    } else if (user.email) {
                        setProfileName(user.email.split('@')[0]);
                    }
                } catch {
                    if (user.email) {
                        setProfileName(user.email.split('@')[0]);
                    }
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que deseas salir de tu cuenta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Error', 'No se pudo cerrar la sesión.');
                        }
                    },
                },
            ]
        );
    };

    const initial = profileName ? profileName.charAt(0).toUpperCase() : 'U';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Barra superior con avatar y estado */}
                <View style={styles.topBar}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{initial}</Text>
                        </View>
                        <View>
                            <Text style={styles.greetingText}>Bienvenido/a</Text>
                            <Text style={styles.userName}>{profileName || 'Usuario'}</Text>
                        </View>
                    </View>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>En línea</Text>
                    </View>
                </View>

                {/* Banner de bienvenida */}
                <View style={styles.welcomeBanner}>
                    <Text style={styles.welcomeTitle}>¡Hola de nuevo! ✨</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Organiza tu día, gestiona tus tareas pendientes y mantén tu perfil siempre actualizado.
                    </Text>
                    <View style={styles.bannerIconWrapper}>
                        <Ionicons name="rocket-outline" size={70} color={theme.colors.primary} />
                    </View>
                </View>

                {/* Sección de accesos rápidos */}
                <Text style={styles.sectionTitle}>Módulos principales</Text>
                <View style={styles.cardsGrid}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionCard,
                            pressed && styles.actionCardPressed,
                        ]}
                        onPress={() => navigation.navigate('Tareas')}
                    >
                        <View style={[styles.cardIconContainer, styles.cardIconIndigo]}>
                            <Ionicons name="checkbox-outline" size={26} color={theme.colors.primary} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Mis Tareas</Text>
                            <Text style={styles.cardDescription}>
                                Agrega, revisa y completa tareas en tiempo real.
                            </Text>
                        </View>
                        <View style={styles.chevronWrapper}>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
                        </View>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.actionCard,
                            pressed && styles.actionCardPressed,
                        ]}
                        onPress={() => navigation.navigate('Perfil')}
                    >
                        <View style={[styles.cardIconContainer, styles.cardIconCyan]}>
                            <Ionicons name="person-circle-outline" size={26} color={theme.colors.accent} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Mi Perfil</Text>
                            <Text style={styles.cardDescription}>
                                Consulta tu información personal y cuenta registrada.
                            </Text>
                        </View>
                        <View style={styles.chevronWrapper}>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
                        </View>
                    </Pressable>
                </View>

                {/* Botón de cerrar sesión */}
                <Pressable
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.logoutButtonPressed,
                    ]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
