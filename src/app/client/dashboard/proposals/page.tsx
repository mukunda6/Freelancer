import { ProposalCard } from '@/components/client/proposal-card';
import { proposals } from '@/lib/data';

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">
        Proposals Received
      </h1>
      <div className="space-y-4">
        {proposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
