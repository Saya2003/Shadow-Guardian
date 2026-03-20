import { Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const guardians = [
  { name: "Ananya K.", distance: "12m", signal: 92, angle: 45 },
  { name: "Priya S.", distance: "28m", signal: 74, angle: 160 },
  { name: "Meera R.", distance: "45m", signal: 58, angle: 280 },
];

const NearbyGuardians = () => {
  return (
    <section className="fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Radio className="w-4 h-4 text-online" />
          Nearby Guardians
        </h2>
        <Badge variant="secondary" className="bg-online/10 text-online border-online/20 text-xs">
          {guardians.length} in range
        </Badge>
      </div>

      {/* Radar */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-44 h-44 shrink-0">
          {/* Concentric rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border border-border/40"
              style={{
                inset: `${ring * 20}%`,
              }}
            />
          ))}
          {/* Sweep */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left radar-sweep"
              style={{
                background: "linear-gradient(90deg, hsl(var(--online) / 0.6), transparent)",
              }}
            />
          </div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-online shadow-[0_0_8px_hsl(var(--online)/0.5)]" />
          {/* Guardian dots */}
          {guardians.map((g, i) => {
            const rad = (g.angle * Math.PI) / 180;
            const dist = 30 + (100 - g.signal) * 0.4;
            const x = 50 + Math.cos(rad) * dist;
            const y = 50 + Math.sin(rad) * dist;
            return (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-sos shadow-[0_0_6px_hsl(var(--sos)/0.4)]"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                title={g.name}
              />
            );
          })}
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-border/60" />
        </div>

        {/* List */}
        <div className="flex-1 w-full space-y-2">
          {guardians.map((g, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.distance} away</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-online"
                    style={{ width: `${g.signal}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{g.signal}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyGuardians;
