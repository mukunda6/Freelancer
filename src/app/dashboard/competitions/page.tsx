
import { competitions } from "@/lib/data";
import { CompetitionCard } from "@/components/freelancer/competition-card";
import { Trophy } from "lucide-react";

export default function CompetitionsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Trophy className="w-8 h-8 text-accent" />
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Project Competitions</h1>
            <p className="text-muted-foreground">
                Compete with other freelancers to win projects and prizes.
            </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {competitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
