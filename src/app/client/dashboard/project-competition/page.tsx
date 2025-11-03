
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trophy } from "lucide-react";

export default function ProjectCompetitionPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Trophy className="w-8 h-8 text-accent" />
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Create a Project Competition</h1>
            <p className="text-muted-foreground">
                Define the challenge and invite freelancers to compete for your project.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Competition Details</CardTitle>
          <CardDescription>
            Fill out the details below to launch your project competition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="competition-title">Competition Title</Label>
              <Input id="competition-title" placeholder="e.g., Design a new company logo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition-description">Brief & Requirements</Label>
              <Textarea id="competition-description" placeholder="Describe the project, goals, and what you expect freelancers to deliver." className="min-h-[150px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="prize-amount">Prize Amount ($)</Label>
                    <Input id="prize-amount" type="number" placeholder="e.g., 1000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="deadline">Submission Deadline</Label>
                    <Input id="deadline" type="date" />
                </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit">Launch Competition</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
