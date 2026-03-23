import { Flashlight, FlashlightOff, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuickTogglesProps {
  discreteMode: boolean;
  onToggleDiscrete: () => void;
}

const QuickToggles = ({ discreteMode, onToggleDiscrete }: QuickTogglesProps) => {
  const [flashlight, setFlashlight] = useState(false);

  return (
    <div className="flex items-center gap-3 fade-in-up" style={{ animationDelay: "0.15s" }}>
      <Button
        variant={flashlight ? "default" : "outline"}
        className={`flex-1 h-12 gap-2 ${flashlight ? 'bg-foreground text-background hover:bg-foreground/90' : ''}`}
        onClick={() => setFlashlight(!flashlight)}
      >
        {flashlight ? <Flashlight className="w-5 h-5" /> : <FlashlightOff className="w-5 h-5" />}
        <span className="text-sm">{flashlight ? "Light ON" : "Flashlight"}</span>
      </Button>

      <Button
        variant={discreteMode ? "default" : "outline"}
        className={`flex-1 h-12 gap-2 ${discreteMode ? 'bg-sos text-sos-foreground hover:bg-sos/90' : ''}`}
        onClick={onToggleDiscrete}
      >
        {discreteMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        <span className="text-sm">{discreteMode ? "Discrete ON" : "Discrete Mode"}</span>
      </Button>
    </div>
  );
};

export default QuickToggles;
