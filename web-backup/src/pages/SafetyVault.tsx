import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Lock, FileText, DownloadCloud } from "lucide-react";

const SafetyVault = () => {
  return (
    <div className="min-h-screen bg-background transition-opacity duration-500">
      <Header />
      <main className="px-4 pb-24 pt-6 max-w-3xl mx-auto space-y-6 fade-in-up">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Lock className="w-6 h-6 text-online" />
            Safety Vault
          </h1>
          <p className="text-sm text-muted-foreground border-b border-border pb-4">
            Securely access your critical information offline. Data here is encrypted and never leaves your device unless you explicitly share it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border flex flex-col items-center text-center gap-3 cursor-pointer hover:bg-surface transition-colors">
            <div className="p-3 bg-surface rounded-full">
              <FileText className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Medical ID</h3>
              <p className="text-xs text-muted-foreground">Blood type, allergies, medications</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border flex flex-col items-center text-center gap-3 cursor-pointer hover:bg-surface transition-colors">
            <div className="p-3 bg-surface rounded-full">
              <DownloadCloud className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Offline Maps Data</h3>
              <p className="text-xs text-muted-foreground">Pre-downloaded safe zones</p>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default SafetyVault;
