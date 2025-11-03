'use client';

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { type Project } from "@/lib/data";
import React from 'react';
import { useFirebase } from "@/firebase/provider";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, serverTimestamp } from "firebase/firestore";

export function ApplyProjectForm({ project, onSubmissionSuccess }: { project: Project, onSubmissionSuccess: () => void }) {
    const { toast } = useToast();
    const { firestore, user } = useFirebase();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!firestore || !user) {
            toast({ title: "Error", description: "You must be logged in to apply.", variant: "destructive" });
            return;
        }

        const form = e.currentTarget;
        const coverLetter = (form.elements.namedItem('cover-letter') as HTMLTextAreaElement)?.value;
        const bidAmount = (form.elements.namedItem('bid-amount') as HTMLInputElement)?.value;

        const proposalData = {
            freelancerUid: user.uid,
            freelancerName: user.displayName || "Anonymous Freelancer",
            freelancerAvatar: user.photoURL || `https://api.dicebear.com/8.x/lorelei/svg?seed=${user.uid}`,
            clientUid: project.clientUid || "UNKNOWN_CLIENT_UID", // Important for security rules
            projectId: project.id,
            projectName: project.title,
            bid: parseInt(bidAmount, 10),
            coverLetter: coverLetter,
            status: 'Pending' as const,
            submittedAt: serverTimestamp(),
        };

        const proposalsRef = collection(firestore, 'proposals');
        addDocumentNonBlocking(proposalsRef, proposalData);
        
        toast({
            title: "Application Submitted!",
            description: `Your proposal for "${project.title}" has been sent.`,
        });

        onSubmissionSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue={user?.displayName || ''} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ''} required />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="mobile-number">Mobile Number</Label>
                    <Input id="mobile-number" type="tel" placeholder="(123) 456-7890" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bid-amount">Bid Amount ($)</Label>
                    <Input
                        id="bid-amount"
                        name="bid-amount"
                        type="number"
                        defaultValue={project.budget}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="cover-letter">Proposal Details</Label>
                <Textarea
                    id="cover-letter"
                    name="cover-letter"
                    placeholder="Explain why you're the best fit for this project..."
                    className="min-h-[120px]"
                    required
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="file-upload">Attach Files</Label>
                <Input
                    id="file-upload"
                    type="file"
                    className="col-span-3"
                />
                 <p className="text-xs text-muted-foreground">Attach your portfolio, resume, or any other relevant files.</p>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit">Submit Application</Button>
            </div>
        </form>
    );
}
