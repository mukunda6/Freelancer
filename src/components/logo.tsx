import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-foreground", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Briefcase className="h-6 w-6" />
      </div>
      <span className="text-2xl font-headline font-bold">Freelancer Hub</span>
    </div>
  );
}
