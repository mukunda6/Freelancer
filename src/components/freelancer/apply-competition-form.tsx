'use client';

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { type Competition } from "@/lib/data";
import React from 'react';
import { useFirebase } from "@/firebase/provider";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, serverTimestamp, runTransaction, doc, updateDoc } from "firebase/firestore";


export function ApplyCompetitionForm({ competition, onSubmissionSuccess }: { competition: Competition, onSubmissionSuccess: () => void }) {
    const { toast } = useToast();
    const { firestore, user } = useFirebase();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            clientUid: competition.clientUid, // Important for security rules
            projectId: competition.id, // Using competition ID as project ID
            projectName: competition.title,
            bid: parseInt(bidAmount, 10),
            coverLetter: coverLetter,
            status: 'Pending' as const,
            submittedAt: serverTimestamp(),
        };
        
        // Since we are writing to proposals and updating competition entries, we should use a transaction.
        // However, the `competitions` are mock data and not in Firestore.
        // For now, we'll just write the proposal and manually update mock data.
        // In a real app, 'competitions' would be a Firestore collection.

        const proposalsRef = collection(firestore, 'proposals');
        addDocumentNonBlocking(proposalsRef, proposalData);

        // This function mutates the mock data. In a real scenario, you'd update a Firestore doc.
        // For the demo, this provides immediate feedback.
        // addCompetitionEntry(competition.id);

        toast({
            title: "Application Submitted!",
            description: `Your entry for "${competition.title}" has been sent.`,
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
                    <Label htmlFor="bid-amount">Entry Fee / Bid ($)</Label>
                    <Input
                        id="bid-amount"
                        name="bid-amount"
                        type="number"
                        defaultValue={competition.prize}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="cover-letter">Submission Details</Label>
                <Textarea
                    id="cover-letter"
                    name="cover-letter"
                    placeholder="Explain your submission and why it's the best..."
                    className="min-h-[120px]"
                    required
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="file-upload">Attach Submission Files</Label>
                <Input
                    id="file-upload"
                    type="file"
                    className="col-span-3"
                />
                 <p className="text-xs text-muted-foreground">Attach your design files, documents, or a zip archive.</p>
            </div>
            <div className="flex justify-end pt-2">
                <Button type="submit">Submit Entry</Button>
            </div>
        </form>
    );
}
