
'use client';

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { proposals, type Competition, addCompetitionEntry } from "@/lib/data";
import React from 'react';

export function ApplyCompetitionForm({ competition, onSubmissionSuccess }: { competition: Competition, onSubmissionSuccess: () => void }) {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const coverLetter = (form.elements.namedItem('cover-letter') as HTMLTextAreaElement)?.value;
        const bidAmount = (form.elements.namedItem('bid-amount') as HTMLInputElement)?.value;

        // Simulate adding the proposal to the mock data
        proposals.unshift({
            id: `prop${Date.now()}`,
            freelancerName: 'Jane Doe', // This would be the current user
            freelancerAvatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZXxlbnwwfHx8fDE3NjIxMTIxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
            projectName: competition.title,
            bid: parseInt(bidAmount, 10),
            coverLetter: coverLetter,
            status: 'Pending',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        });
        
        // This function now directly mutates the shared data.
        addCompetitionEntry(competition.id);
        
        toast({
            title: "Application Submitted!",
            description: `Your proposal for "${competition.title}" has been sent.`,
        });

        onSubmissionSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Jane Doe" defaultValue="Jane Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane.doe@example.com" defaultValue="jane.doe@example.com" required />
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
                        defaultValue={competition.prize}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="cover-letter">Proposal Details</Label>
                <Textarea
                    id="cover-letter"
                    name="cover-letter"
                    placeholder="Explain why you're the best fit for this competition..."
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

    

    