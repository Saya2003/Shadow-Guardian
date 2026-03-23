import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { AlertTriangle, RadioReceiver } from 'lucide-react-native';
import { useMeshNetwork } from '../context/MeshContext';

export default function SOSTrigger() {
  const { isBroadcasting, broadcastStatus, broadcastSOS, cancelSOS } = useMeshNetwork();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => { Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start(); };
  const handlePressOut = () => { Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start(); };

  return (
    <View className="items-center py-8">
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={!isBroadcasting ? broadcastSOS : undefined}
          style={{ width: 180, height: 180, borderRadius: 90, backgroundColor: isBroadcasting ? '#9F1239' : '#E11D48', justifyContent: 'center', alignItems: 'center' }}
        >
          <AlertTriangle size={48} color="white" />
          <Text className="text-white font-bold text-lg mt-2 tracking-wider">
            {isBroadcasting ? "SOS ACTIVE" : "TRIGGER SOS"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {isBroadcasting && (
        <View className="mt-6 items-center">
          <RadioReceiver size={24} color="#E11D48" />
          <Text className="text-sos font-medium mt-2 text-center px-4">{broadcastStatus}</Text>
          
          <TouchableOpacity onPress={cancelSOS} className="mt-8 bg-surface px-6 py-3 rounded-full border border-border">
            <Text className="text-muted-foreground">Cancel SOS</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
