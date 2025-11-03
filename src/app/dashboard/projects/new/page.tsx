
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
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useFirebase } from "@/firebase/provider";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection } from "firebase/firestore";

export default function NewProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, user } = useFirebase();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore || !user) {
      toast({ title: "Error", description: "You must be logged in to add a project.", variant: "destructive" });
      return;
    }

    const form = e.currentTarget;
    const projectTitle = (form.elements.namedItem('project-title') as HTMLInputElement)?.value;
    
    const newProject = {
        freelancerUid: user.uid,
        title: projectTitle || 'New Project',
        description: (form.elements.namedItem('project-description') as HTMLTextAreaElement)?.value,
        budget: parseInt((form.elements.namedItem('budget') as HTMLInputElement)?.value, 10) || 0,
        category: (form.elements.namedItem('category') as HTMLInputElement)?.value,
        postedBy: user.displayName || 'Jane Doe', // This would be the current freelancer's name
        imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
        imageHint: 'new project',
        skills: ((form.elements.namedItem('skills') as HTMLInputElement)?.value).split(',').map(s => s.trim()),
        duration: (form.elements.namedItem('duration') as HTMLInputElement)?.value,
        rating: Math.round((Math.random() * (5 - 4.5) + 4.5) * 10) / 10, // Mock a high rating for new projects
        requirements: 'N/A', // Not in form, default value
        features: 'N/A', // Not in form, default value
        impact: 'N/A', // Not in form, default value
    };

    const portfolioProjectsRef = collection(firestore, `users/${user.uid}/portfolioProjects`);
    addDocumentNonBlocking(portfolioProjectsRef, newProject);

    toast({
      title: "Project Added! 🎉",
      description: `Your new project "${projectTitle || 'New Project'}" has been added to your portfolio.`,
    });

    // Redirect to the projects page after a short delay
    setTimeout(() => {
        router.push('/dashboard/projects');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <PlusCircle className="w-8 h-8 text-primary" />
        <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Add New Project to Portfolio</h1>
            <p className="text-muted-foreground">
                Showcase your latest work to attract clients.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill out the details below to add a new project to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input id="project-title" name="project-title" placeholder="e.g., E-commerce Platform Redesign" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea id="project-description" name="project-description" placeholder="Briefly describe the project, your role, and the outcome." className="min-h-[150px]" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" placeholder="e.g., Web Development" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="skills">Skills Used (comma-separated)</Label>
                    <Input id="skills" name="skills" placeholder="e.g., React, Next.js, UI/UX" required/>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="budget">Project Budget ($)</Label>
                    <Input id="budget" name="budget" type="number" placeholder="e.g., 5000" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Project Duration</Label>
                    <Input id="duration" name="duration" placeholder="e.g., 6 Weeks" required/>
                </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit">Add Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    