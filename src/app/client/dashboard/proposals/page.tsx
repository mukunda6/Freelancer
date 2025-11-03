
'use client';

import { ProposalCard } from '@/components/client/proposal-card';
import { proposals as mockProposals } from '@/lib/data';
import type { Proposal } from '@/lib/data';

export default function ProposalsPage() {
  // For demonstration, we'll use mock data.
  // In a real app, you would use the Firestore hook like this:
  // const { data: proposals, isLoading } = useCollection<Proposal>(proposalsQuery);
  const proposals: (Proposal & { id: string })[] = mockProposals;
  const isLoading = false;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">
        Proposals Received
      </h1>
      <div className="space-y-4">
        {isLoading && (
          <>
            <div className="p-4 border rounded-lg shadow-md"><div className="animate-pulse flex space-x-4"><div className="rounded-full bg-slate-200 h-10 w-10"></div><div className="flex-1 space-y-3 py-1"><div className="h-2 bg-slate-200 rounded"></div><div className="space-y-2"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 rounded col-span-2"></div><div className="h-2 bg-slate-200 rounded col-span-1"></div></div><div className="h-2 bg-slate-200 rounded"></div></div></div></div></div>
            <div className="p-4 border rounded-lg shadow-md"><div className="animate-pulse flex space-x-4"><div className="rounded-full bg-slate-200 h-10 w-10"></div><div className="flex-1 space-y-3 py-1"><div className="h-2 bg-slate-200 rounded"></div><div className="space-y-2"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 rounded col-span-2"></div><div className="h-2 bg-slate-200 rounded col-span-1"></div></div><div className="h-2 bg-slate-200 rounded"></div></div></div></div></div>
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
