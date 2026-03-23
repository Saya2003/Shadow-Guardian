import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SafetyVault from "./pages/SafetyVault.tsx";
import Community from "./pages/Community.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Login from "./pages/Login.tsx";
import { useState, useEffect } from "react";
import { MeshProvider } from "./context/MeshContext.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const registered = localStorage.getItem("sg_node_id");
    if (registered) setIsRegistered(true);
    else setIsRegistered(false);
  }, []);

  if (isRegistered === null) return null; // loading state

  if (!isRegistered) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Onboarding onComplete={() => { setIsRegistered(true); setIsAuthenticated(true); }} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Login onUnlock={() => setIsAuthenticated(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MeshProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vault" element={<SafetyVault />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MeshProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
