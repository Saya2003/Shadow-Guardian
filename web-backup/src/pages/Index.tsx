import { useState } from "react";
import Header from "@/components/Header";
import SOSTrigger from "@/components/SOSTrigger";
import NearbyGuardians from "@/components/NearbyGuardians";
import EmergencyContacts from "@/components/EmergencyContacts";
import OfflineMap from "@/components/OfflineMap";
import QuickToggles from "@/components/QuickToggles";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [discreteMode, setDiscreteMode] = useState(false);

  return (
    <div
      className="min-h-screen bg-background transition-opacity duration-500"
      style={{ opacity: discreteMode ? 0.15 : 1 }}
    >
      <Header />

      <main className="px-4 pb-24 max-w-3xl mx-auto space-y-8">
        <SOSTrigger />

        <QuickToggles
          discreteMode={discreteMode}
          onToggleDiscrete={() => setDiscreteMode(!discreteMode)}
        />

        <NearbyGuardians />

        <EmergencyContacts />

        <OfflineMap />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
