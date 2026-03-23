import { useState } from "react";
import { Shield, Smartphone, Fingerprint, Activity, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginProps {
  onUnlock: () => void;
}

const Login = ({ onUnlock }: LoginProps) => {
  const [status, setStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [pin, setPin] = useState("");

  const handleSimulateBiometrics = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onUnlock();
      }, 800);
    }, 1500);
  };

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        setStatus("success");
        setTimeout(() => {
          onUnlock();
        }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 fade-in-up">
      <div className="w-full max-w-sm flex flex-col items-center space-y-8">
        {/* Logo area */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center relative">
            <Shield className="w-8 h-8 text-sos" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-online border-[3px] border-background" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Shadow Guardian</h1>
            <p className="text-sm text-online flex items-center justify-center gap-1.5 mt-1 font-medium bg-online/10 px-2.5 py-0.5 rounded-full inline-flex">
              <Wifi className="w-3.5 h-3.5" /> Background Mesh Active
            </p>
          </div>
        </div>

        {/* Auth Box */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col items-center gap-6">
          <p className="text-center text-sm font-medium text-foreground">
            Unlock your node to access controls and emergency settings.
          </p>

          <Button
            size="lg"
            variant={status === "success" ? "default" : "outline"}
            className={`w-full h-14 relative overflow-hidden transition-all duration-300 ${status === "success" ? "bg-online text-white hover:bg-online/90" : "bg-surface"}`}
            onClick={status === "idle" ? handleSimulateBiometrics : undefined}
          >
            {status === "idle" && (
              <>
                <Fingerprint className="w-6 h-6 mr-2 text-sos" />
                <span className="font-semibold">Simulate FaceID / Fingerprint</span>
              </>
            )}
            {status === "scanning" && (
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 animate-pulse text-sos" />
                Scanning...
              </span>
            )}
            {status === "success" && (
              <span className="font-semibold">Unlocked!</span>
            )}
            
            {status === "scanning" && (
              <div className="absolute inset-0 bg-sos/10 animate-pulse pointer-events-none" />
            )}
          </Button>

          <div className="flex items-center w-full gap-4 opacity-50">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">or use pin</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="flex gap-3 justify-center">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  pin.length > i ? "bg-foreground border-foreground scale-110" : "border-muted-foreground/30 bg-transparent"
                }`}
              />
            ))}
          </div>

          {/* Simple numpad mock */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePinInput(num.toString())}
                className="h-14 rounded-xl bg-surface hover:bg-surface-elevated active:scale-95 transition-all text-xl font-medium text-foreground border border-border/50"
              >
                {num}
              </button>
            ))}
            <div className="col-start-2">
              <button
                onClick={() => handlePinInput("0")}
                className="w-full h-14 rounded-xl bg-surface hover:bg-surface-elevated active:scale-95 transition-all text-xl font-medium text-foreground border border-border/50"
              >
                0
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Authentication required to modify trusted guardians or cancel an active SOS.
        </p>
      </div>
    </div>
  );
};

export default Login;
