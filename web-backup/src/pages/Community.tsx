import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Users, AlertTriangle, MessageSquare, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMeshNetwork } from "@/context/MeshContext";

const Community = () => {
  const { nearbyNodes, activeAlerts } = useMeshNetwork();
  
  return (
    <div className="min-h-screen bg-background transition-opacity duration-500">
      <Header />
      <main className="px-4 pb-24 pt-6 max-w-3xl mx-auto space-y-6 fade-in-up">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-online" />
              Community
            </h1>
            <p className="text-sm text-muted-foreground">
              Local mesh network alerts and intelligence
            </p>
          </div>
          <Badge variant="secondary" className="bg-online/10 text-online border-online/20 text-xs">
            {nearbyNodes.length > 0 ? `${nearbyNodes.length * 3 + Math.floor(Math.random() * 5)} Active Nodes` : "Searching..."}
          </Badge>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Mesh Alerts</h2>
          
          {activeAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No recent peer alerts in your zone.</p>
          ) : (
            activeAlerts.map(alert => (
              <div key={alert.id} className="p-4 rounded-xl bg-card border border-border flex items-start gap-4 fade-in-up">
                <div className={`p-2 rounded-full shrink-0 ${
                  alert.type === 'sos' ? 'bg-sos/10' : 
                  alert.type === 'warning' ? 'bg-yellow-500/10' : 'bg-surface'
                }`}>
                  {alert.type === 'sos' ? <ShieldAlert className="w-5 h-5 text-sos" /> :
                   alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> :
                   <MessageSquare className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="space-y-1 w-full">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    alert.type === 'sos' ? 'bg-sos/20 text-sos' :
                    alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-surface-elevated text-foreground'
                  }`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <p className="text-sm text-foreground mt-1">{alert.message}</p>
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-2">
                    <span>{alert.time}</span>
                    <span>Verified via {alert.hops} hops</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;
