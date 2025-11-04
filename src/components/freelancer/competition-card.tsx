
'use client';

import type { Competition } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ApplyCompetitionForm } from "./apply-competition-form";
import React from "react";
import type { Timestamp } from "firebase/firestore";


function formatDeadline(deadline: string | Date | Timestamp): string {
    if (!deadline) return 'N/A';
    
    let date: Date;
    if (typeof deadline === 'string') {
        date = new Date(deadline);
    } else if (deadline instanceof Date) {
        date = deadline;
    } else if (deadline && typeof deadline === 'object' && 'toDate' in deadline) {
        date = (deadline as Timestamp).toDate();
    } else {
        return 'N/A';
    }

    if (isNaN(date.getTime())) {
        return 'N/A';
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function CompetitionCard({ competition, onApplicationSubmit }: { competition: Competition, onApplicationSubmit: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleSuccess = () => {
        // This is now handled by real-time updates, but we can keep it for immediate UI feedback if needed
        // or to trigger other client-side actions.
        onApplicationSubmit(); 
        setIsDialogOpen(false);
    }

    const getBadgeVariant = (status: 'Live' | 'Judging' | 'Completed'): VariantProps<typeof badgeVariants>['variant'] => {
        switch (status) {
          case 'Live':
            return 'default';
          case 'Judging':
            return 'secondary';
          case 'Completed':
            return 'outline';
          default:
            return 'outline';
        }
    }

  return (
     <Card className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 w-full hover:border-accent group">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg group-hover:text-accent transition-colors">{competition.title}</CardTitle>
                <Badge variant={getBadgeVariant(competition.status)}>{competition.status}</Badge>
            </div>
            <CardDescription>A design competition to create the next big thing.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    <div>
                        <p className="text-muted-foreground">Prize</p>
                        <p className="font-bold text-lg text-foreground">${competition.prize.toLocaleString('en-US')}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                        <p className="text-muted-foreground">Entries</p>
                        <p className="font-bold text-lg text-foreground">{competition.entries}</p>
                    </div>
                </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2 border-t">
                <Calendar className="h-4 w-4" />
                <span>Deadline: {formatDeadline(competition.deadline)}</span>
            </div>
        </CardContent>
        <CardFooter className="pt-4 bg-secondary/30 p-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className="w-full bg-accent hover:bg-accent/90" disabled={competition.status !== 'Live'}>
                        Apply <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Apply to: {competition.title}</DialogTitle>
                        <DialogDescription>
                            Submit your proposal and files to enter the competition. Good luck!
                        </DialogDescription>
                    </DialogHeader>
                    <ApplyCompetitionForm competition={competition} onSubmissionSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
  );
}
