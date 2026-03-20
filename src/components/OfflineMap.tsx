import { MapPin, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OfflineMap = () => {
  return (
    <section className="fade-in-up" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-base font-semibold text-foreground mb-4">
        Last Known Location
      </h2>
      <div className="relative rounded-xl bg-card border border-border overflow-hidden">
        {/* Map placeholder with grid pattern */}
        <div className="relative h-48 sm:h-56 bg-surface overflow-hidden">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Subtle roads */}
          <div className="absolute top-1/3 left-0 right-0 h-px bg-muted-foreground/20" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-muted-foreground/10" />
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-muted-foreground/15" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-muted-foreground/10" />

          {/* Location pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="relative">
              <MapPin className="w-8 h-8 text-sos drop-shadow-lg" fill="hsl(var(--sos))" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-sos/30 blur-sm" />
            </div>
          </div>

          {/* Offline badge */}
          <Badge variant="outline" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border-border text-muted-foreground text-[10px]">
            <WifiOff className="w-3 h-3 mr-1" />
            Offline Map
          </Badge>
        </div>

        {/* Info bar */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div>
            <p className="text-sm font-medium text-foreground">28.6139° N, 77.2090° E</p>
            <p className="text-xs text-muted-foreground mt-0.5">New Delhi, India</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="text-xs text-foreground">2 min ago</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfflineMap;
