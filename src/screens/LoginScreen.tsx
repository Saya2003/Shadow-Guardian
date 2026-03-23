import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Lock, Fingerprint, Shield } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginProps {
  onUnlock: () => void;
}

export default function LoginScreen({ onUnlock }: LoginProps) {
  const [pin, setPin] = useState("");

  const handleUnlock = async () => {
    // Simulating biometric unlock
    await AsyncStorage.setItem("sg_authenticated", "true");
    onUnlock();
  };

  return (
    <View className="flex-1 bg-background items-center justify-center p-6">
      <View className="items-center mb-12">
        <View className="w-24 h-24 rounded-full bg-surface border-2 border-sos/30 items-center justify-center mb-4">
          <Shield size={48} color="#E11D48" />
        </View>
        <Text className="text-2xl font-bold text-foreground">Welcome Back</Text>
        <Text className="text-muted-foreground mt-2">Unlock your mesh identity</Text>
      </View>

      <View className="w-full space-y-8">
        <TouchableOpacity 
          onPress={handleUnlock}
          className="w-full h-20 bg-surface rounded-3xl border border-border items-center justify-center flex-row active:opacity-90"
        >
          <Fingerprint size={32} color="#E11D48" style={{ marginRight: 12 }} />
          <Text className="text-foreground font-semibold text-lg">FaceID / Fingerprint</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-muted-foreground text-sm uppercase tracking-widest mb-6">Or Enter PIN</Text>
          <View className="flex-row gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className="w-4 h-4 rounded-full bg-muted-foreground opacity-30" />
            ))}
          </View>
          
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-sos font-semibold text-base">Forgotten PIN?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-12 flex-row items-center bg-online/10 px-4 py-2 rounded-full border border-online/20">
        <View className="w-2 h-2 rounded-full bg-online mr-2 animate-pulse" />
        <Text className="text-xs text-online font-medium uppercase tracking-widest">Background Mesh Node Active</Text>
      </View>
    </View>
  );
}
