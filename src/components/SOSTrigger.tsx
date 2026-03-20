import { useState, useRef, useCallback } from "react";
import { AlertTriangle } from "lucide-react";

const SOSTrigger = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const handleTrigger = () => {
    setIsTriggered(true);
  };

  const handleCancel = () => {
    setIsTriggered(false);
    setSliderX(0);
  };

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    const rail = railRef.current;
    if (!rail) return;

    const railRect = rail.getBoundingClientRect();
    const startX = clientX;
    const maxSlide = railRect.width - 56;

    const onMove = (moveX: number) => {
      const delta = Math.max(0, Math.min(moveX - startX, maxSlide));
      setSliderX(delta);
      if (delta >= maxSlide * 0.85) {
        handleCancel();
        cleanup();
      }
    };

    const cleanup = () => {
      setIsDragging(false);
      setSliderX(0);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onMouseUp = () => cleanup();
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const onTouchEnd = () => cleanup();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }, []);

  return (
    <section className="flex flex-col items-center gap-6 py-8 fade-in-up">
      {/* SOS Button */}
      <button
        onClick={!isTriggered ? handleTrigger : undefined}
        className={`
          relative w-40 h-40 sm:w-48 sm:h-48 rounded-full
          flex flex-col items-center justify-center gap-2
          text-sos-foreground font-bold text-lg
          transition-all duration-300 select-none
          ${isTriggered
            ? "bg-sos scale-95 shadow-[0_0_60px_hsl(var(--sos)/0.6)]"
            : "bg-gradient-to-br from-sos to-sos-glow sos-pulse hover:scale-105 active:scale-95 cursor-pointer"
          }
        `}
        aria-label="Trigger SOS"
      >
        <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12" />
        <span className="text-base sm:text-lg tracking-wider">
          {isTriggered ? "SOS ACTIVE" : "TRIGGER SOS"}
        </span>
        {/* Outer rings */}
        {!isTriggered && (
          <>
            <span className="absolute inset-[-8px] rounded-full border-2 border-sos/20 animate-ping" style={{ animationDuration: '2s' }} />
            <span className="absolute inset-[-4px] rounded-full border border-sos/30" />
          </>
        )}
      </button>

      {/* Slide to Cancel */}
      {isTriggered && (
        <div className="w-full max-w-xs fade-in-up">
          <p className="text-center text-muted-foreground text-sm mb-3">
            Slide to cancel SOS
          </p>
          <div
            ref={railRef}
            className="relative h-14 rounded-full bg-surface border border-border overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
              <span style={{ opacity: 1 - sliderX / 200 }}>
                → Slide to cancel →
              </span>
            </div>
            <div
              className={`absolute top-1 left-1 w-12 h-12 rounded-full bg-sos flex items-center justify-center cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
              style={{ transform: `translateX(${sliderX}px)` }}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            >
              <span className="text-sos-foreground text-lg">✕</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SOSTrigger;
