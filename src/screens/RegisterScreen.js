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
import { register } from '../firebase/authService';
import { saveUser } from '../services/userService';
import { styles } from '../styles/RegisterStyles';
import { theme } from '../styles/theme';

const firebaseMessages = {
    'auth/email-already-in-use': 'Este correo ya está registrado con otra cuenta.',
    'auth/invalid-email': 'Escribe un correo electrónico válido.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/operation-not-allowed': 'El registro con correo no está habilitado.',
};

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password) {
            Alert.alert('Datos incompletos', 'Por favor llena todos los campos para crear tu cuenta.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Contraseña débil', 'La contraseña debe contener un mínimo de 6 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const credential = await register(email.trim(), password);
            await saveUser(credential.user.uid, {
                nombre: name.trim(),
                email: credential.user.email,
                createdAt: new Date().toISOString(),
            });
        } catch (error) {
            Alert.alert('Error al registrarse', firebaseMessages[error.code] || 'No se pudo completar el registro.');
        } finally {
            setLoading(false);
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
                            <Ionicons name="person-add" size={28} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.badge}>Nuevo usuario</Text>
                        <Text style={styles.title}>Crea tu cuenta</Text>
                        <Text style={styles.subtitle}>
                            Únete hoy para gestionar tus tareas y organizar tu día a día.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre completo</Text>
                            <View
                                style={[
                                    styles.inputContainer,
                                    nameFocused && { borderColor: theme.colors.borderFocus },
                                ]}
                            >
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color={nameFocused ? theme.colors.primary : theme.colors.textMuted}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ej. Juan Pérez"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setNameFocused(true)}
                                    onBlur={() => setNameFocused(false)}
                                />
                            </View>
                        </View>

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
                                    placeholder="Mínimo 6 caracteres"
                                    placeholderTextColor={theme.colors.textMuted}
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    onSubmitEditing={handleRegister}
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
                            <Text style={styles.helperText}>Usa al menos 6 caracteres con letras y números.</Text>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.primaryButtonPressed,
                            ]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.primaryButtonText}>Registrarme</Text>
                                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                                </>
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                        <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
                            <Text style={styles.footerLink}>Inicia sesión</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}