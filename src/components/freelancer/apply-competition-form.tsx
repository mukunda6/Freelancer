
'use client';

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { proposals, type Competition } from "@/lib/data";

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
        
        // This is a simulation of notifying the client.
        // In a real app, this would trigger a backend event.
        console.log(`Client notified of new application for ${competition.title}`);
        
        toast({
            title: "Application Submitted!",
            description: `Your proposal for "${competition.title}" has been sent.`,
        });

        onSubmissionSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bid-amount" className="text-right">
                    Bid ($)
                </Label>
                <Input
                    id="bid-amount"
                    name="bid-amount"
                    type="number"
                    defaultValue={competition.prize}
                    className="col-span-3"
                    required
                />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="cover-letter" className="text-right pt-2">
                    Proposal
                </Label>
                <Textarea
                    id="cover-letter"
                    name="cover-letter"
                    placeholder="Explain why you're the best fit for this competition..."
                    className="col-span-3 min-h-[100px]"
                    required
                />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file-upload" className="text-right">
                    Files
                </Label>
                <Input
                    id="file-upload"
                    type="file"
                    className="col-span-3"
                />
            </div>
            <div className="flex justify-end col-span-4">
                <Button type="submit">Submit Application</Button>
            </div>
        </form>
    );
}
