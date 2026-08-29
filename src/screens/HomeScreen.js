import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';

import { logout } from '../firebase/authService';
import { styles } from '../styles/HomeStyles';

export default function HomeScreen({ navigation }) {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
            Alert.alert(
                'Error',
                'No se pudo cerrar la sesión.',
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.badge}>
                        Sesión Activa
                    </Text>

                    <Text style={styles.title}>
                        ¡Hola de nuevo!
                    </Text>

                    <Text style={styles.subtitle}>
                        Has iniciado sesión con éxito en Firebase.
                    </Text>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.profileButton,
                        pressed && styles.profileButtonPressed,
                    ]}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Text style={styles.profileButtonText}>
                        Ver mi perfil
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.logoutButtonPressed,
                    ]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>
                        Cerrar sesión
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}
