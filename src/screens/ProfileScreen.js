import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { logout } from '../firebase/authService';
import { auth } from '../firebase/firebase';
import { getUser } from '../services/userService';
import { styles } from '../styles/ProfileStyles';
import { theme } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
    const user = auth.currentUser;

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

const pickImage = async () => {
    try {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                'Permiso necesario',
                'Necesitamos acceso a tus imágenes.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            setImage(result.assets[0].uri);
        }
    } catch (error) {
        console.log('Error al seleccionar imagen:', error);
        Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
};

    useEffect(() => {
        
        const loadProfile = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const data = await getUser(user.uid);
                setProfile(data);
            } catch (error) {
                console.log('Error al cargar perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user]);

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Deseas cerrar tu sesión actual?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo cerrar la sesión.');
                        }
                    },
                },
            ]
        );
    };

    const displayName =
        profile?.nombre ||
        user?.displayName ||
        user?.email?.split('@')[0] ||
        'Usuario';

    const displayEmail = profile?.email || user?.email || 'No disponible';
    const initial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        hitSlop={8}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={20}
                            color={theme.colors.text}
                        />
                    </Pressable>

                    <Text style={styles.headerTitle}>Mi Perfil</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                    </View>
                ) : (
                    <>
                        <View style={styles.heroCard}>
                            <Pressable
                                style={styles.avatarWrapper}
                                onPress={pickImage}
                                accessibilityRole="button"
                                accessibilityLabel="Seleccionar foto de perfil"
                            >
                                {image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                        }}
                                    />
                                ) : (
                                    <Text style={styles.avatarText}>
                                        {initial}
                                    </Text>
                                )}
                            </Pressable>

                            <Text style={styles.heroName}>{displayName}</Text>
                            <Text style={styles.heroEmail}>{displayEmail}</Text>

                            <View style={styles.verifiedBadge}>
                                <Ionicons
                                    name="shield-checkmark"
                                    size={14}
                                    color={theme.colors.success}
                                />
                                <Text style={styles.verifiedText}>
                                    Cuenta Activa
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>
                            Detalles de la cuenta
                        </Text>

                        <View style={styles.infoCard}>
                            <View
                                style={[
                                    styles.infoRow,
                                    styles.infoRowBorder,
                                ]}
                            >
                                <View style={styles.infoIconWrapper}>
                                    <Ionicons
                                        name="person-outline"
                                        size={18}
                                        color={theme.colors.primary}
                                    />
                                </View>

                                <View style={styles.infoTextWrapper}>
                                    <Text style={styles.infoLabel}>
                                        Nombre completo
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {displayName}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={[
                                    styles.infoRow,
                                    styles.infoRowBorder,
                                ]}
                            >
                                <View style={styles.infoIconWrapper}>
                                    <Ionicons
                                        name="mail-outline"
                                        size={18}
                                        color={theme.colors.primary}
                                    />
                                </View>

                                <View style={styles.infoTextWrapper}>
                                    <Text style={styles.infoLabel}>
                                        Correo electrónico
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {displayEmail}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <View style={styles.infoIconWrapper}>
                                    <Ionicons
                                        name="finger-print-outline"
                                        size={18}
                                        color={theme.colors.primary}
                                    />
                                </View>

                                <View style={styles.infoTextWrapper}>
                                    <Text style={styles.infoLabel}>
                                        Identificador (UID)
                                    </Text>
                                    <Text
                                        style={styles.uidValue}
                                        numberOfLines={1}
                                        ellipsizeMode="middle"
                                    >
                                        {user?.uid || 'Desconocido'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>
                            Acciones rápidas
                        </Text>

                        <View style={styles.actionsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.primaryButton,
                                    pressed && styles.primaryButtonPressed,
                                ]}
                                onPress={() => navigation.navigate('Tareas')}
                            >
                                <Ionicons
                                    name="checkbox-outline"
                                    size={18}
                                    color="#fff"
                                />
                                <Text style={styles.primaryButtonText}>
                                    Ir a mis tareas
                                </Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.secondaryButton,
                                    pressed && styles.secondaryButtonPressed,
                                ]}
                                onPress={() => navigation.navigate('Inicio')}
                            >
                                <Ionicons
                                    name="home-outline"
                                    size={18}
                                    color={theme.colors.text}
                                />
                                <Text style={styles.secondaryButtonText}>
                                    Volver al inicio
                                </Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.logoutButton,
                                    pressed && styles.logoutButtonPressed,
                                ]}
                                onPress={handleLogout}
                            >
                                <Ionicons
                                    name="log-out-outline"
                                    size={18}
                                    color={theme.colors.danger}
                                />
                                <Text style={styles.logoutButtonText}>
                                    Cerrar sesión
                                </Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
