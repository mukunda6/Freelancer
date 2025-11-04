
import type { Competition } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '../ui/badge';
import type { Timestamp } from 'firebase/firestore';

// Helper function to format the deadline
function formatDeadline(deadline: string | Date | Timestamp): string {
    if (!deadline) return 'N/A';
    if (typeof deadline === 'string') {
        return deadline;
    }
    if (deadline instanceof Date) {
        return deadline.toLocaleDateString();
    }
    // Check if it's a Firestore Timestamp-like object
    if (deadline && typeof deadline === 'object' && 'toDate' in deadline) {
        return deadline.toDate().toLocaleDateString();
    }
    return 'N/A';
}

export function CompetitionCard({ competition }: { competition: Competition }) {
    
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
     <Card className="flex flex-col shadow-md hover:shadow-xl transition-all duration-300 w-full hover:border-accent">
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
                        <p className="font-bold text-lg text-foreground">${competition.prize.toLocaleString()}</p>
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
           <Button variant="link" className="text-accent p-0 h-auto" asChild>
                <Link href={`/client/dashboard/competitions/${competition.id}`}>
                    View Submissions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
           </Button>
        </CardFooter>
      </Card>
  );
}
