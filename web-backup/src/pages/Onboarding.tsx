import { useState } from "react";
import { Shield, Bluetooth, MapPin, User, Phone, CheckCircle2, Lock, Navigation, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => setStep((s) => s + 1);

  const generateNodeId = () => {
    return "sg_node_" + Math.random().toString(36).substr(2, 9);
  };

  const handleComplete = () => {
    localStorage.setItem("sg_node_id", generateNodeId());
    localStorage.setItem("sg_user_name", name);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 fade-in-up">
      {/* Progress Bar */}
      <div className="w-full max-w-sm mx-auto flex items-center justify-between mb-8 mt-4 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surface z-0 rounded-full overflow-hidden">
          <div className="h-full bg-sos transition-all duration-500 rounded-full" style={{ width: `${((step - 1) / 3) * 100}%` }} />
        </div>
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold text-xs transition-colors duration-500 shadow-sm border-2 ${
              step >= s ? "bg-sos text-white border-sos" : "bg-card text-muted-foreground border-border"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="flex-1 w-full max-w-sm mx-auto flex flex-col justify-center gap-6">
        
        {step === 1 && (
          <div className="space-y-6 fade-in-up animate-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-surface border-2 border-sos/20 flex items-center justify-center relative shadow-[0_0_30px_hsl(var(--sos)/0.2)]">
                <Shield className="w-10 h-10 text-sos" />
                <div className="absolute -inset-4 rounded-full border border-border animate-spin-slow" style={{ animationDuration: '8s' }}></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Welcome to the Mesh</h1>
              <p className="text-muted-foreground text-sm">
                Shadow Guardian uses peer-to-peer Bluetooth networks to send distress signals even when the grid goes dark.
              </p>
            </div>

            <div className="space-y-3 bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-surface p-2 rounded-lg text-foreground"><Bluetooth className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">Bluetooth Permissions</h3>
                  <p className="text-xs text-muted-foreground">Required to connect to nearby guardian nodes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-surface p-2 rounded-lg text-foreground"><MapPin className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">Location Services</h3>
                  <p className="text-xs text-muted-foreground">Required by your OS to scan for Bluetooth Low Energy devices.</p>
                </div>
              </div>
            </div>

            {/* Privacy Alert */}
            <div className="bg-sos/10 border border-sos/20 p-4 rounded-xl flex gap-3 text-sos">
              <Lock className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed font-medium">
                <strong>Privacy Promise:</strong> Your data never leaves this device unless you trigger an SOS. We do not use central servers or cloud accounts.
              </div>
            </div>

            <Button onClick={handleNext} className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-semibold text-base mt-4 shadow-lg active:scale-[0.98] transition-transform">
              Accept & Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 fade-in-up animate-in">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">On-Device Identity</h1>
              <p className="text-muted-foreground text-sm">
                Create your local cryptographic profile. This keeps your real number hidden from strangers on the mesh.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Saya"
                    className="w-full h-12 bg-surface border border-border rounded-xl pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-sos focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full h-12 bg-surface border border-border rounded-xl pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-sos focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground ml-1">Only shared with your Trusted Guardians in an emergency.</p>
              </div>
            </div>

            <Button
              disabled={!name || !phone}
              onClick={handleNext}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-semibold text-base mt-8 shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              Generate Crypto ID
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 fade-in-up animate-in text-center">
            <div className="mx-auto w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-6 border border-border text-foreground">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Verify Number</h1>
              <p className="text-muted-foreground text-sm">
                Enter the 6-digit code sent to<br />
                <strong className="text-foreground">{phone || "+91 90000 00000"}</strong>
              </p>
            </div>

            <div className="flex justify-center gap-2 my-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-10 h-12 text-center text-xl font-bold bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-sos focus:border-transparent transition-all"
                />
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground italic mb-6">
              * Note: For this hackathon demo, no actual SMS is sent. Enter any code or click Verify.
            </p>

            <Button
              onClick={handleNext}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-semibold text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              Verify Code (Simulate)
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 fade-in-up animate-in">
            <div className="text-center space-y-2 mb-6">
              <h1 className="text-2xl font-bold text-foreground">Trusted Guardians</h1>
              <p className="text-muted-foreground text-sm">
                Select at least 3 contacts. They will receive automated SMS relay alerts if you trigger an SOS.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: "Mom", num: "+91 98765 43210" },
                { name: "Priya S.", num: "+91 87654 32109" },
                { name: "Aarav", num: "+91 76543 21098" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-sm font-bold text-foreground">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.num}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-online" />
                </div>
              ))}
              
              <Button variant="outline" className="w-full h-12 border-dashed border-2 border-border text-muted-foreground hover:text-foreground">
                + Add from Contacts
              </Button>
            </div>

            <div className="bg-surface border border-border p-4 rounded-xl mt-6">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4" /> Automating SMS...
              </h4>
              <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                "I have added you as a Guardian on Shadow Guardian. If I am in danger and offline, you will receive a relay alert."
              </p>
            </div>

            <Button onClick={handleComplete} className="w-full h-14 bg-sos text-white hover:bg-sos/90 font-bold text-base mt-4 shadow-[0_0_20px_hsl(var(--sos)/0.4)] hover:shadow-[0_0_25px_hsl(var(--sos)/0.6)] active:scale-[0.98] transition-all">
              Activate Mesh Node
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Onboarding;
