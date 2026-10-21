import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase/firebase';
import { theme } from '../styles/theme';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TasksScreen from '../screens/TasksScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LocationScreen from '../screens/LocationScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setCheckingSession(false);
            },
        );

        return unsubscribe;
    }, []);

    if (checkingSession) {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.splashIconContainer}>
                    <Ionicons name="sparkles" size={36} color={theme.colors.primary} />
                </View>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                    style={styles.spinner}
                />
                <Text style={styles.loadingText}>Cargando tu aplicación...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                // Stack para usuarios autenticados
                <Stack.Navigator
                    initialRouteName="Inicio"
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        contentStyle: { backgroundColor: theme.colors.background },
                    }}
                >
                    <Stack.Screen
                        name="Inicio"
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="Perfil"
                        component={ProfileScreen}
                    />
                    <Stack.Screen
                        name="Tareas"
                        component={TasksScreen}
                    />
                       <Stack.Screen
                            name="Location"
                            component={LocationScreen}
                          />
                          
                </Stack.Navigator>
            ) : (
                // Stack para usuarios no autenticados
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        contentStyle: { backgroundColor: theme.colors.background },
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Registro"
                        component={RegisterScreen}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        padding: 24,
    },
    splashIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: theme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primaryBorder,
        marginBottom: 20,
    },
    spinner: {
        marginBottom: 12,
    },
    loadingText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
});
