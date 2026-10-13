import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { login, resetPassword } from '../firebase/authService';
import { styles } from '../styles/LoginStyles';
import { theme } from '../styles/theme';

const firebaseMessages = {
    'auth/invalid-email': 'Escribe un correo electrónico válido.',
    'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'La contraseña ingresada es incorrecta.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Inténtalo más tarde.',
};

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const getErrorMessage = (error) => firebaseMessages[error.code] || 'No se pudo iniciar sesión. Verifica tus datos.';

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
            return;
        }

        setLoading(true);
        try {
            await login(email.trim(), password);
        } catch (error) {
            Alert.alert('Error de acceso', getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Recuperar contraseña', 'Escribe tu correo en el campo superior para enviarte el enlace.');
            return;
        }

        try {
            await resetPassword(email.trim());
            Alert.alert('Correo enviado', 'Te enviamos un enlace para restablecer tu contraseña. Revisa tu bandeja.');
        } catch (error) {
            Alert.alert('Error', getErrorMessage(error));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="sparkles" size={30} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.badge}>Bienvenido</Text>
                        <Text style={styles.title}>Iniciar Sesión</Text>
                        <Text style={styles.subtitle}>
                            Ingresa tus credenciales para acceder a tus tareas y perfil.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <View
                                style={[
                                    styles.inputContainer,
                                    emailFocused && { borderColor: theme.colors.borderFocus },
                                ]}
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={emailFocused ? theme.colors.primary : theme.colors.textMuted}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="tu@correo.com"
                                    placeholderTextColor={theme.colors.textMuted}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View
                                style={[
                                    styles.inputContainer,
                                    passwordFocused && { borderColor: theme.colors.borderFocus },
                                ]}
                            >
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={passwordFocused ? theme.colors.primary : theme.colors.textMuted}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ingresa tu contraseña"
                                    placeholderTextColor={theme.colors.textMuted}
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    onSubmitEditing={handleLogin}
                                />
                                <Pressable
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeButton}
                                    hitSlop={12}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color={theme.colors.textMuted}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.primaryButtonPressed,
                            ]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.primaryButtonText}>Entrar a mi cuenta</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                                </>
                            )}
                        </Pressable>

                        <Pressable
                            onPress={handleResetPassword}
                            style={styles.forgotPasswordButton}
                            hitSlop={8}
                        >
                            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                        </Pressable>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>¿No tienes cuenta aún? </Text>
                        <Pressable onPress={() => navigation.navigate('Registro')} hitSlop={8}>
                            <Text style={styles.footerLink}>Regístrate gratis</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}