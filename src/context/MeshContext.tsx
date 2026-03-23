import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
const MOCK_NAMES = ["Ananya K.", "Priya S.", "Meera R.", "Node_8F2", "Node_2A1", "Kavya D.", "Unknown Node"];

export const MeshProvider = ({ children }: { children: React.ReactNode }) => {
  const [nearbyNodes, setNearbyNodes] = useState<MeshNode[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<MeshAlert[]>([
    { id: "1", type: "warning", message: "Unlit alleyway reported near Station Road. Avoid area.", time: "2 hours ago", hops: 3 }
  ]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState("");

  useEffect(() => {
    const initialNodes = Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, i) => ({
      id: `node_${i}`,
      name: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
      distance: `${Math.floor(Math.random() * 50) + 5}m`,
      signal: Math.floor(Math.random() * 60) + 40,
      angle: Math.floor(Math.random() * 360),
    }));
    setNearbyNodes(initialNodes);

    const interval = setInterval(() => {
      setNearbyNodes(current => {
        let updated = current.map(node => {
          const sigDrift = (Math.random() - 0.5) * 8;
          const newSignal = Math.max(0, Math.min(100, node.signal + sigDrift));
          return { ...node, signal: newSignal, distance: `${Math.floor(30 + (100 - newSignal) * 0.5)}m` };
        }).filter(n => n.signal > 15);
        if (updated.length < 5 && Math.random() > 0.8) {
          updated.push({
            id: `node_${Date.now()}`, name: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
            distance: "45m", signal: 40, angle: Math.floor(Math.random() * 360),
          });
        }
        return updated;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const broadcastSOS = useCallback(() => {
    setIsBroadcasting(true);
    setBroadcastStatus("Generating Crypto Payload...");
    setTimeout(() => setBroadcastStatus(`Hopping via ${nearbyNodes[0]?.name || "Nearest Node"}...`), 1500);
    setTimeout(() => setBroadcastStatus("Hop 2 successful: ISP Relay Hit"), 3500);
    setTimeout(() => {
      setBroadcastStatus("Emergency Contacts Notified");
      setActiveAlerts(prev => [{ id: `sos_${Date.now()}`, type: "sos", message: "SOS signal actively relayed.", time: "Just now", hops: 2 }, ...prev]);
    }, 5500);
  }, [nearbyNodes]);

  const cancelSOS = useCallback(() => {
    setIsBroadcasting(false); setBroadcastStatus("");
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
