import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Animated, Dimensions } from "react-native";
import { Shield, Bluetooth, MapPin, User, Phone, CheckCircle2, Lock, Navigation, MessageSquare } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

interface OnboardingProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trustedContacts, setTrustedContacts] = useState<{name: string, num: string}[]>([]);

  const handleNext = () => setStep((s) => s + 1);

  const generateNodeId = () => {
    return "sg_node_" + Math.random().toString(36).substring(2, 11);
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem("sg_node_id", generateNodeId());
    await AsyncStorage.setItem("sg_user_name", name);
    await AsyncStorage.setItem("sg_registered", "true");
    await AsyncStorage.setItem("sg_trusted_contacts", JSON.stringify(trustedContacts));
    onComplete();
  };

  const addContact = () => {
    // For demo, we'll just cycle through some "discovered" contacts or just prompt
    const newContact = { 
      name: `Contact ${trustedContacts.length + 1}`, 
      num: `+91 ${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}` 
    };
    setTrustedContacts([...trustedContacts, newContact]);
  };

  const removeContact = (index: number) => {
    setTrustedContacts(trustedContacts.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1 bg-background p-6 pt-12">
      {/* Progress Bar */}
      <View className="w-full flex-row items-center justify-between mb-8 mt-4 relative">
        <View className="absolute left-0 right-0 top-1/2 h-1 bg-surface rounded-full overflow-hidden">
          <View className="h-full bg-sos" style={{ width: `${((step - 1) / 3) * 100}%` }} />
        </View>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
              step >= s ? "bg-sos border-sos" : "bg-card border-border"
            }`}
          >
            <Text className={`text-xs font-bold ${step >= s ? "text-white" : "text-muted-foreground"}`}>{s}</Text>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View className="space-y-6">
            <View className="items-center mb-6">
              <View className="w-20 h-20 rounded-full bg-surface border-2 border-sos/20 items-center justify-center shadow-lg">
                <Shield size={40} color="#E11D48" />
              </View>
            </View>
            
            <View className="items-center space-y-2">
              <Text className="text-2xl font-bold text-foreground">Welcome to the Mesh</Text>
              <Text className="text-muted-foreground text-center text-sm leading-5">
                Shadow Guardian uses peer-to-peer Bluetooth networks to send distress signals even when the grid goes dark.
              </Text>
            </View>

            <View className="bg-card p-4 rounded-xl border border-border mt-6">
              <View className="flex-row items-start mb-4">
                <View className="bg-surface p-2 rounded-lg mr-3"><Bluetooth size={20} color="#FAFAFA" /></View>
                <View className="flex-1">
                  <Text className="font-medium text-sm text-foreground">Bluetooth Permissions</Text>
                  <Text className="text-xs text-muted-foreground">Required to connect to nearby guardian nodes.</Text>
                </View>
              </View>
              <View className="flex-row items-start">
                <View className="bg-surface p-2 rounded-lg mr-3"><MapPin size={20} color="#FAFAFA" /></View>
                <View className="flex-1">
                  <Text className="font-medium text-sm text-foreground">Location Services</Text>
                  <Text className="text-xs text-muted-foreground">Required by your OS to scan for Bluetooth Low Energy devices.</Text>
                </View>
              </View>
            </View>

            <View className="bg-sos/10 border border-sos/20 p-4 rounded-xl flex-row mt-6">
              <Lock size={20} color="#E11D48" style={{ marginRight: 12, marginTop: 2 }} />
              <View className="flex-1">
                <Text className="text-xs text-sos font-medium leading-4">
                  <Text className="font-bold">Privacy Promise:</Text> Your data never leaves this device unless you trigger an SOS. We do not use central servers or cloud accounts.
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleNext}
              className="w-full h-14 bg-foreground rounded-xl items-center justify-center mt-8 active:opacity-90"
            >
              <Text className="text-background font-bold text-base">Accept & Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View className="space-y-6">
            <View className="items-center space-y-2 mb-8">
              <Text className="text-2xl font-bold text-foreground">On-Device Identity</Text>
              <Text className="text-muted-foreground text-center text-sm">
                Create your local cryptographic profile. This keeps your real number hidden from strangers on the mesh.
              </Text>
            </View>

            <View className="space-y-5">
              <View>
                <Text className="text-sm font-medium text-foreground mb-2 ml-1">Display Name</Text>
                <View className="relative flex-row items-center">
                  <View className="absolute left-3 z-10"><User size={20} color="#A1A1AA" /></View>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="E.g., Saya"
                    placeholderTextColor="#A1A1AA"
                    className="w-full h-14 bg-surface border border-border rounded-xl pl-12 pr-4 text-foreground text-base focus:border-sos"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2 ml-1">Phone Number</Text>
                <View className="relative flex-row items-center">
                  <View className="absolute left-3 z-10"><Phone size={20} color="#A1A1AA" /></View>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+91 90000 00000"
                    placeholderTextColor="#A1A1AA"
                    className="w-full h-14 bg-surface border border-border rounded-xl pl-12 pr-4 text-foreground text-base focus:border-sos"
                  />
                </View>
                <Text className="text-[11px] text-muted-foreground mt-2 ml-1">Only shared with your Trusted Guardians in an emergency.</Text>
              </View>
            </View>

            <TouchableOpacity
              disabled={!name || !phone}
              onPress={handleNext}
              className={`w-full h-14 rounded-xl items-center justify-center mt-12 ${!name || !phone ? 'bg-muted opacity-50' : 'bg-foreground'}`}
            >
              <Text className={`${!name || !phone ? 'text-muted-foreground' : 'text-background'} font-bold text-base`}>Generate Crypto ID</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View className="items-center space-y-6">
            <View className="w-16 h-16 bg-surface rounded-full items-center justify-center mb-6 border border-border">
              <MessageSquare size={32} color="#FAFAFA" />
            </View>
            <View className="items-center space-y-2">
              <Text className="text-2xl font-bold text-foreground">Verify Number</Text>
              <Text className="text-muted-foreground text-center text-sm leading-5">
                Enter the 6-digit code sent to{"\n"}
                <Text className="text-foreground font-bold">{phone || "+91 90000 00000"}</Text>
              </Text>
            </View>

            <View className="flex-row justify-center gap-2 my-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <View key={i} className={`w-10 h-14 bg-surface border rounded-xl items-center justify-center ${i === 1 ? 'border-sos' : 'border-border'}`}>
                   <Text className="text-xl font-bold text-foreground">{i === 1 ? '•' : ''}</Text>
                </View>
              ))}
            </View>

            <Text className="text-[11px] text-muted-foreground italic text-center mb-6">
              * Note: For this hackathon demo, no actual SMS is sent. Enter any code or click Verify.
            </Text>

            <TouchableOpacity
              onPress={handleNext}
              className="w-full h-14 bg-foreground rounded-xl items-center justify-center active:opacity-90"
            >
              <Text className="text-background font-bold text-base">Verify Code (Simulate)</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 4 && (
          <View className="space-y-6">
            <View className="items-center space-y-2 mb-6">
              <Text className="text-2xl font-bold text-foreground">Trusted Guardians</Text>
              <Text className="text-muted-foreground text-center text-sm leading-5">
                Select at least 3 contacts. They will receive automated SMS relay alerts if you trigger an SOS.
              </Text>
            </View>

            <View className="space-y-3">
              {trustedContacts.length === 0 ? (
                <Text className="text-center text-muted-foreground py-4">No trusted guardians added yet. Tap below to add.</Text>
              ) : (
                trustedContacts.map((c, i) => (
                  <View key={i} className="bg-card p-4 rounded-2xl border border-border flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-full bg-surface items-center justify-center mr-3">
                        <Text className="text-foreground font-bold">{c.name[0]}</Text>
                      </View>
                      <View>
                        <Text className="font-medium text-sm text-foreground">{c.name}</Text>
                        <Text className="text-xs text-muted-foreground">{c.num}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => removeContact(i)}>
                      <CheckCircle2 size={20} color="#10B981" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
              
              <TouchableOpacity 
                onPress={addContact}
                className="w-full h-14 border-dashed border-2 border-border rounded-2xl items-center justify-center"
              >
                <Text className="text-muted-foreground font-medium">+ Add Secure Contact</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-surface p-4 rounded-xl mt-6 border border-border">
              <View className="flex-row items-center mb-2">
                <Navigation size={16} color="#FAFAFA" style={{ marginRight: 6 }} />
                <Text className="text-xs font-bold text-foreground uppercase tracking-widest">Automating SMS...</Text>
              </View>
              <Text className="text-[11px] text-muted-foreground italic leading-4">
                "I have added you as a Guardian on Shadow Guardian. If I am in danger and offline, you will receive a relay alert."
              </Text>
            </View>

            <TouchableOpacity 
              onPress={handleComplete} 
              className="w-full h-16 bg-sos rounded-2xl items-center justify-center mt-8 shadow-lg shadow-sos/40 active:opacity-90"
            >
              <Text className="text-white font-bold text-lg">Activate Mesh Node</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
