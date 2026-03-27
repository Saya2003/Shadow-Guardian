import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Users, Settings as SettingsIcon, Shield } from 'lucide-react-native';
import { MeshProvider } from './src/context/MeshContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import IndexScreen from './src/screens/IndexScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#121212', 
          borderTopWidth: 1, 
          borderTopColor: '#2A2A2A', 
          paddingBottom: 8, 
          height: 60, 
          elevation: 0 
        },
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
  );
}

export default function App() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkRegistration();
  }, []);

  const checkRegistration = async () => {
    const registered = await AsyncStorage.getItem("sg_registered");
    setIsRegistered(registered === "true");
  };

  if (isRegistered === null) {
     return (
       <View className="flex-1 bg-background items-center justify-center">
         <Shield size={64} color="#E11D48" className="animate-pulse" />
         <Text className="text-muted-foreground mt-4 text-sm uppercase tracking-widest">Waking Mesh Hardware...</Text>
       </View>
     );
  }

  return (
    <MeshProvider>
      <StatusBar style="light" />
      {!isRegistered ? (
        <OnboardingScreen onComplete={() => setIsRegistered(true)} />
      ) : !isAuthenticated ? (
        <LoginScreen onUnlock={() => setIsAuthenticated(true)} />
      ) : (
        <NavigationContainer theme={DarkTheme}>
          <MainTabs />
        </NavigationContainer>
      )}
    </MeshProvider>
  );
}
