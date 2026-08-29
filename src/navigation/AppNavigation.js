import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        // Escucha los cambios en el estado de autenticación de Firebase.
        const unsubscribe = onAuthStateChanged(
            auth,
            currentUser => {
                if (currentUser) {
                    console.log('Usuario autenticado');
                } else {
                    console.log('Sin usuario');
                }

                setUser(currentUser);
                setCheckingSession(false);
            },
        );

        return unsubscribe;
    }, []);

    if (checkingSession) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="#2563eb"
                />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                // Stack para usuarios autenticados.
                <Stack.Navigator
                    initialRouteName="Inicio"
                    screenOptions={{
                        headerShown: false,
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
                </Stack.Navigator>
            ) : (
                // Stack para usuarios no autenticados.
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
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
        backgroundColor: '#f8fafc',
    },
});
