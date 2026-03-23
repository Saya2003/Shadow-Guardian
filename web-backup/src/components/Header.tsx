import { Shield, Wifi, WifiOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const Header = () => {
  const [isOnline] = useState(true);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sos/10">
          <Shield className="w-5 h-5 text-sos" />
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">
          Shadow Guardian
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface text-xs font-medium">
          {isOnline ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-online opacity-75 blink" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-online" />
              </span>
              <Wifi className="w-3.5 h-3.5 text-online" />
              <span className="text-online">Mesh Active</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-offline" />
              </span>
              <WifiOff className="w-3.5 h-3.5 text-offline" />
              <span className="text-offline">Offline</span>
            </>
          )}
        </div>

        <Avatar className="h-9 w-9 border-2 border-border">
          <AvatarFallback className="bg-surface-elevated text-foreground text-sm font-semibold">
            S
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
