import { Armchair, Construction, HardHat, PenTool, Ruler, Sofa, Users, Zap } from "lucide-react";
import type { Service } from "@/content/services";

const icons = {
  "pen-tool": PenTool,
  "hard-hat": HardHat,
  construction: Construction,
  armchair: Armchair,
  zap: Zap,
  sofa: Sofa,
  ruler: Ruler,
  users: Users,
} satisfies Record<Service["icon"], React.ComponentType<{ className?: string }>>;

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
