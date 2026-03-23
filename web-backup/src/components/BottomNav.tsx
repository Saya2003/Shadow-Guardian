import { Home, Lock, Users, Settings as SettingsIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Lock, label: "Safety Vault", path: "/vault" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-stretch max-w-lg mx-auto relative">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={i}
              to={tab.path}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px]
                transition-colors duration-200
                ${isActive ? "text-sos" : "text-muted-foreground hover:text-foreground"}
              `}
              aria-label={tab.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute top-0 w-[40px] h-[3px] rounded-full bg-sos shadow-[0_0_8px_hsl(var(--sos)/0.6)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
