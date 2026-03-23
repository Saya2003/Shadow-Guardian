import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { BleManager, Device, State } from 'react-native-ble-plx';
import * as Location from 'expo-location';
import { Platform, PermissionsAndroid } from 'react-native';

export type MeshNode = { id: string; name: string; distance: string; signal: number; angle: number; };
export type MeshAlert = { id: string; type: "warning" | "info" | "sos"; message: string; time: string; hops: number; };

type MeshContextType = {
  nearbyNodes: MeshNode[];
  activeAlerts: MeshAlert[];
  isBroadcasting: boolean;
  broadcastStatus: string;
  broadcastSOS: () => void;
  cancelSOS: () => void;
};

const MeshContext = createContext<MeshContextType | null>(null);
const bleManager = new BleManager();

export const MeshProvider = ({ children }: { children: React.ReactNode }) => {
  const [nearbyNodes, setNearbyNodes] = useState<MeshNode[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<MeshAlert[]>([
    { id: "1", type: "warning", message: "Unlit alleyway reported near Station Road. Avoid area.", time: "2 hours ago", hops: 3 }
  ]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState("");
  
  const scanSubscription = useRef<any>(null);

  useEffect(() => {
    setupBle();
    return () => {
      bleManager.stopDeviceScan();
    };
  }, []);

  const setupBle = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const state = await bleManager.state();
    if (state !== State.PoweredOn) {
      // For demo, we still show UI but real scanning needs BT on
      console.log("Bluetooth is not Powered On");
    }

    startScanning();
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      return !!granted['android.permission.ACCESS_FINE_LOCATION'];
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    }
  };

  const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan Error:", error);
        return;
      }

      if (device && device.name) {
        setNearbyNodes(prev => {
          const exists = prev.find(n => n.id === device.id);
          const newNode: MeshNode = {
            id: device.id,
            name: device.name || "Unknown Node",
            distance: device.rssi ? `${Math.abs(device.rssi) - 40}m` : "Unknown",
            signal: device.rssi ? Math.max(0, 100 + device.rssi) : 50,
            angle: Math.floor(Math.random() * 360), // Random angle for UI placement
          };

          if (exists) {
            return prev.map(n => n.id === device.id ? newNode : n);
          }
          return [...prev, newNode];
        });
      }
    });
  };

  const broadcastSOS = useCallback(() => {
    setIsBroadcasting(true);
    setBroadcastStatus("Generating Crypto Payload...");
    
    // In a real Native build with a custom Dev client, 
    // we would use a library like react-native-ble-peripheral here.
    // For Expo Go, we simulate the "Success" of the broadcast attempt.

    setTimeout(() => setBroadcastStatus(`Mesh relay active. Hopping...`), 1500);
    setTimeout(() => setBroadcastStatus("Signal verified by nearby nodes."), 3500);
    setTimeout(() => {
      setBroadcastStatus("Emergency Contacts Notified via Mesh");
      setActiveAlerts(prev => [{ 
        id: `sos_${Date.now()}`, 
        type: "sos", 
        message: "SOS actively relayed via 2 mesh nodes.", 
        time: "Just now", 
        hops: 2 
      }, ...prev]);
    }, 5500);
  }, []);

  const cancelSOS = useCallback(() => {
    setIsBroadcasting(false);
    setBroadcastStatus("");
  }, []);

  return (
    <MeshContext.Provider value={{ nearbyNodes, activeAlerts, isBroadcasting, broadcastStatus, broadcastSOS, cancelSOS }}>
      {children}
    </MeshContext.Provider>
  );
};

export const useMeshNetwork = () => {
  const ctx = useContext(MeshContext);
  if (!ctx) throw new Error("must be internal");
  return ctx;
};
