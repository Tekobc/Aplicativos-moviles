import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { auth } from '../firebase/firebase';

export default function ProfileScreen({navigation}) {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>
        {user?.email || 'No disponible'}
      </Text>

      <Text style={styles.label}>UID</Text>
      <Text style={styles.value}>
        {user?.uid || 'No disponible'}
      </Text>

    <Pressable
        style={({ pressed }) => [
        styles.profileButton,
        pressed && styles.profileButtonPressed,
        ]}
        onPress={() => navigation.goBack()}
        >
        <Text>
        Go back jome
        </Text>
    </Pressable>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    marginBottom: 32,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  value: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#111827',
  },
});
