import { Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const contacts = [
  { name: "Ananya K.", phone: "+91 98765 43210", status: "Notified", initials: "AK" },
  { name: "Priya S.", phone: "+91 87654 32109", status: "Standby", initials: "PS" },
  { name: "Meera R.", phone: "+91 76543 21098", status: "Standby", initials: "MR" },
  { name: "Kavya D.", phone: "+91 65432 10987", status: "Unreachable", initials: "KD" },
];

const statusColors: Record<string, string> = {
  Notified: "bg-online/10 text-online border-online/20",
  Standby: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Unreachable: "bg-muted text-muted-foreground border-border",
};

const EmergencyContacts = () => {
  return (
    <section className="fade-in-up" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-base font-semibold text-foreground mb-4">
        Trusted Guardians
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {contacts.map((c, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border"
          >
            <Avatar className="h-12 w-12 border-2 border-border">
              <AvatarFallback className="bg-surface-elevated text-foreground text-sm font-semibold">
                {c.initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.phone}</p>
            </div>
            <Badge variant="outline" className={`text-[10px] ${statusColors[c.status]}`}>
              {c.status}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="w-full h-10 text-sos hover:bg-sos/10 hover:text-sos"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencyContacts;
