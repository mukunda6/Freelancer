
'use client';

import { useParams } from 'next/navigation';
import { useFirebase, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, query, where } from 'firebase/firestore';
import type { Competition, Proposal } from '@/lib/data';
import { ProposalCard } from '@/components/client/proposal-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Trophy, Calendar, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function CompetitionSubmissionsPage() {
  const params = useParams();
  const competitionId = params.id as string;
  const { firestore } = useFirebase();

  // Fetch the specific competition
  const competitionRef = useMemoFirebase(() => {
    if (!firestore || !competitionId) return null;
    return doc(firestore, 'competitions', competitionId);
  }, [firestore, competitionId]);
  const { data: competition, isLoading: isLoadingCompetition } = useDoc<Competition>(competitionRef);

  // Fetch all proposals for this competition
  const proposalsQuery = useMemoFirebase(() => {
    if (!firestore || !competitionId) return null;
    return query(collection(firestore, 'proposals'), where('projectId', '==', competitionId));
  }, [firestore, competitionId]);

  const { data: proposals, isLoading: isLoadingProposals } = useCollection<Proposal>(proposalsQuery);

  const isLoading = isLoadingCompetition || isLoadingProposals;

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/client/dashboard">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      )}

      {competition && (
        <>
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-accent" />
                    <div>
                        <CardTitle className="font-headline text-2xl">{competition.title}</CardTitle>
                        <CardDescription>Submissions for your competition.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3 rounded-md border p-4">
                    <Award className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Prize</p>
                        <p className="font-bold text-lg">${competition.prize.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-md border p-4">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Total Entries</p>
                        <p className="font-bold text-lg">{proposals?.length ?? competition.entries}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-md border p-4">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Deadline</p>
                        <p className="font-bold text-lg">
                            {competition.deadline ? format(new Date((competition.deadline as any).seconds * 1000), 'PPP') : 'N/A'}
                        </p>
                    </div>
                </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4 pt-6">
            <h2 className="text-xl font-bold font-headline">Received Submissions</h2>
             {proposals && proposals.length > 0 ? (
              proposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <p>No submissions have been received for this competition yet.</p>
              </div>
            )}
          </div>
        </>
      )}

      {!isLoading && !competition && (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Competition Not Found</h2>
            <p className="text-muted-foreground">We couldn't find the competition you're looking for.</p>
        </div>
      )}

    </div>
  );
}
