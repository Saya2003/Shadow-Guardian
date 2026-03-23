import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import NearbyGuardians from '../components/NearbyGuardians';
import SOSTrigger from '../components/SOSTrigger';
import { Shield } from 'lucide-react-native';

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-background pt-16 px-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-foreground">Shadow Guardian</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-online mr-2" />
              <Text className="text-sm font-medium text-online">Background Mesh Active</Text>
            </View>
          </View>
          <Shield size={32} color="#E11D48" />
        </View>

        <View className="items-center py-4">
           <SOSTrigger />
        </View>
        
        <View className="mt-0">
          <NearbyGuardians />
        </View>
      </ScrollView>
    </View>
  );
}
