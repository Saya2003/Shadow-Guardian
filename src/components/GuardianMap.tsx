import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useMeshNetwork, MeshNode } from '../context/MeshContext';
import { Shield } from 'lucide-react-native';

const DARK_MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "feature": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "feature": "poi", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
  { "feature": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "feature": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "feature": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
  { "feature": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

export default function GuardianMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const { nearbyNodes } = useMeshNetwork();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (!location) {
    return (
      <View className="h-64 w-full bg-card rounded-3xl items-center justify-center border border-border">
        <Text className="text-muted-foreground">Initializing Mesh Map...</Text>
      </View>
    );
  }

  return (
    <View className="h-80 w-full rounded-3xl overflow-hidden border border-border shadow-lg">
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        customMapStyle={DARK_MAP_STYLE}
      >
        {/* User Location */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="My Node"
        >
          <View className="w-10 h-10 bg-sos/20 rounded-full items-center justify-center border-2 border-sos/40">
            <View className="w-4 h-4 bg-sos rounded-full shadow-lg" />
          </View>
        </Marker>

        {/* User Signal Range */}
        <Circle
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          radius={100}
          strokeColor="rgba(225, 29, 72, 0.3)"
          fillColor="rgba(225, 29, 72, 0.05)"
        />

        {/* Nearby Mesh Nodes */}
        {nearbyNodes.map((node) => {
           if (!node.lat || !node.lng) return null;
           
           return (
             <Marker
                key={node.id}
                coordinate={{
                  latitude: location.coords.latitude + node.lat,
                  longitude: location.coords.longitude + node.lng,
                }}
                title={node.name}
             >
               <View className="w-8 h-8 bg-online/20 rounded-full items-center justify-center border border-online/40">
                 <Shield size={16} color="#10B981" />
               </View>
             </Marker>
           );
        })}
      </MapView>
    </View>
  );
}
