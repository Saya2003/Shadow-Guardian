import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Users } from 'lucide-react-native';
import { MeshProvider } from './src/context/MeshContext';

import IndexScreen from './src/screens/IndexScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MeshProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingBottom: 8, height: 60, elevation: 0 },
            tabBarActiveTintColor: '#E11D48',
            tabBarInactiveTintColor: '#A1A1AA',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={IndexScreen} 
            options={{ tabBarIcon: ({color}) => <Home size={24} color={color} /> }} 
          />
          <Tab.Screen 
            name="Community" 
            component={CommunityScreen} 
            options={{ tabBarIcon: ({color}) => <Users size={24} color={color} /> }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MeshProvider>
  );
}
