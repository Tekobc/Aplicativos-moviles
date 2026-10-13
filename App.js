import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/Authcontext';
import AppNavigator from './src/navigation/AppNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" backgroundColor="#f8fafc" />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
