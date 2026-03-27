import React from 'react';
import { View, Text } from 'react-native';
import { useMeshNetwork } from '../context/MeshContext';

export default function NearbyGuardians() {
  const { nearbyNodes } = useMeshNetwork();

  return (
    <View className="flex-1 mt-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-base font-semibold text-foreground">Nearby Guardians</Text>
        <View className="bg-online/10 px-2 py-1 rounded-sm border border-online/20">
          <Text className="text-xs text-online">{nearbyNodes.length} in range</Text>
        </View>
      </View>

      <View className="bg-surface p-4 rounded-xl border border-border">
        {nearbyNodes.length === 0 ? (
          <Text className="text-sm text-center text-muted-foreground py-6">No guardians in range.</Text>
        ) : (
          nearbyNodes.map((g, i) => (
            <View key={i} className="flex-row items-center justify-between py-3 border-b border-border/50">
              <View>
                <Text className="text-sm font-medium text-foreground">{g.name}</Text>
                <Text className="text-xs text-muted-foreground">{g.distance} away</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <View className="h-full rounded-full bg-online" style={{ width: `${g.signal}%` }} />
                </View>
                <Text className="text-xs text-muted-foreground w-8">{Math.floor(g.signal)}%</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
