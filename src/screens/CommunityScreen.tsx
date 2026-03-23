import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useMeshNetwork } from '../context/MeshContext';
import { AlertTriangle, MessageSquare } from 'lucide-react-native';

export default function CommunityScreen() {
  const { activeAlerts } = useMeshNetwork();

  return (
    <View className="flex-1 bg-background pt-16 px-4">
      <View className="mb-6 border-b border-border pb-4">
        <Text className="text-2xl font-bold text-foreground">Community Alerts</Text>
        <Text className="text-sm text-muted-foreground mt-1">Local mesh network intelligence</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeAlerts.length === 0 ? (
          <Text className="text-center text-muted-foreground py-10">No recent alerts.</Text>
        ) : (
          activeAlerts.map(alert => (
            <View key={alert.id} className="bg-card p-4 rounded-2xl mb-4 border border-border flex-row items-start">
              <View className="mr-3 mt-1">
                {alert.type === 'sos' ? <AlertTriangle size={24} color="#E11D48" /> : <MessageSquare size={24} color="#A1A1AA" />}
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-muted-foreground uppercase">{alert.type}</Text>
                <Text className="text-foreground text-sm mt-1 leading-snug">{alert.message}</Text>
                <View className="flex-row justify-between mt-3">
                  <Text className="text-xs text-muted-foreground">{alert.time}</Text>
                  <Text className="text-xs text-online opacity-80">{alert.hops} hops away</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
