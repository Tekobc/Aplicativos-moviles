import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Inicio"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
      />
      <Stack.Screen
        name="Perfil"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Tareas"
        component={TasksScreen}
      />
    </Stack.Navigator>
  );
}
