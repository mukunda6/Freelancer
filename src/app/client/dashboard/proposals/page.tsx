'use client';

import { ProposalCard } from '@/components/client/proposal-card';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Proposal } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProposalsPage() {
  const { firestore, user } = useFirebase();

  // Memoize the query to prevent re-creating it on every render
  const proposalsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    
    // Query for proposals where the clientUid matches the current user's UID
    return query(
      collection(firestore, 'proposals'),
      where('clientUid', '==', user.uid)
    );
  }, [firestore, user]);

  const { data: proposals, isLoading } = useCollection<Proposal>(proposalsQuery);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">
        Proposals Received
      </h1>
      <div className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </>
        )}
        {!isLoading && proposals && proposals.length > 0 && (
          proposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        )}
        {!isLoading && (!proposals || proposals.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No proposals have been received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
