import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Settings as SettingsIcon, Bell, Shield, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background transition-opacity duration-500">
      <Header />
      <main className="px-4 pb-24 pt-6 max-w-3xl mx-auto space-y-8 fade-in-up">
        <div className="space-y-1 border-b border-border pb-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure your application preferences and mesh network rules
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-online uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy & Security
            </h2>
            <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Act as Relay Node</p>
                <p className="text-xs text-muted-foreground mt-0.5">Help bounce signals for others anonymously</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Share Approximate Location</p>
                <p className="text-xs text-muted-foreground mt-0.5">Only during active SOS triggers</p>
              </div>
              <Switch defaultChecked />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Device Integration
            </h2>
            <div className="p-4 rounded-xl bg-card border border-border flex items-center justify-between opacity-50">
              <div>
                <p className="font-medium text-foreground text-sm">Power Button SOS</p>
                <p className="text-xs text-muted-foreground mt-0.5">Press 5 times to trigger. Requires system permissions.</p>
              </div>
              <Switch checked={false} disabled />
            </div>
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Settings;
