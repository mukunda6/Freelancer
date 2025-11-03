import { ReferralCard } from "@/components/referrals/referral-card";
import { referrals } from "@/lib/data";

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Client Referrals</h1>
      </div>
      <div className="space-y-4 max-w-3xl mx-auto">
        {referrals.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>
    </div>
  );
}
