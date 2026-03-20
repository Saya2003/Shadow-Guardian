import { Home, Lock, Users, Settings } from "lucide-react";
import { useState } from "react";

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Lock, label: "Safety Vault" },
  { icon: Users, label: "Community" },
  { icon: Settings, label: "Settings" },
];

const BottomNav = () => {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-stretch max-w-lg mx-auto">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px]
                transition-colors duration-200
                ${isActive ? "text-sos" : "text-muted-foreground hover:text-foreground"}
              `}
              aria-label={tab.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-sos" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
