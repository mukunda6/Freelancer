
'use client';

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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useFirebase } from "@/firebase/provider";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, serverTimestamp } from "firebase/firestore";

export default function ProjectCompetitionPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, user } = useFirebase();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (!firestore || !user) {
      toast({ title: "Error", description: "You must be logged in to create a competition.", variant: "destructive" });
      return;
    }

    const form = e.currentTarget;
    const competitionTitle = (form.elements.namedItem('competition-title') as HTMLInputElement)?.value;
    const competitionDescription = (form.elements.namedItem('competition-description') as HTMLTextAreaElement)?.value;
    const prizeAmount = (form.elements.namedItem('prize-amount') as HTMLInputElement)?.value;
    const deadline = (form.elements.namedItem('deadline') as HTMLInputElement)?.value;

    const newCompetition = {
      clientUid: user.uid,
      title: competitionTitle,
      description: competitionDescription,
      prize: parseInt(prizeAmount, 10),
      deadline: serverTimestamp(), // Using server timestamp for consistency
      status: 'Live' as const,
      entries: 0,
    };
    
    const competitionsRef = collection(firestore, 'competitions');
    addDocumentNonBlocking(competitionsRef, newCompetition);

    toast({
      title: "Competition Launched! 🚀",
      description: `Your competition "${competitionTitle || 'New Project'}" has been posted.`,
    });

    // Redirect to the dashboard after a short delay to allow the user to see the toast.
    setTimeout(() => {
        router.push('/client/dashboard');
    }, 1000);
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="competition-title">Competition Title</Label>
              <Input id="competition-title" name="competition-title" placeholder="e.g., Design a new company logo" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition-description">Brief & Requirements</Label>
              <Textarea id="competition-description" name="competition-description" placeholder="Describe the project, goals, and what you expect freelancers to deliver." className="min-h-[150px]" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="prize-amount">Prize Amount ($)</Label>
                    <Input id="prize-amount" name="prize-amount" type="number" placeholder="e.g., 1000" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="deadline">Submission Deadline</Label>
                    <Input id="deadline" name="deadline" type="date" required/>
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
