
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, Crown, Award, Shield } from "lucide-react";
import { competitors, Competitor } from "@/lib/data";
import { cn } from "@/lib/utils";

const tierConfig = {
  Gold: {
    icon: Crown,
    textColor: "text-yellow-400",
  },
  Silver: {
    icon: Award,
    textColor: "text-slate-400",
  },
  Bronze: {
    icon: Shield,
    textColor: "text-amber-700",
  },
};

export function AccountStatus() {
  const isVerified = false; // Mock status
  // For demo purposes, we'll find "Jane Doe" in the competitors list
  const currentUser: Competitor | undefined = competitors.find(c => c.name === 'Jane Doe');
  const userTier = currentUser?.tier;
  const TierIcon = userTier ? tierConfig[userTier].icon : null;
  const tierTextColor = userTier ? tierConfig[userTier].textColor : '';


  return (
    <div className="space-y-6">
        {userTier && TierIcon && (
             <div className="flex flex-col items-center justify-center space-y-3 rounded-lg border bg-secondary/30 p-6 text-center">
                 <TierIcon className={cn("h-10 w-10", tierTextColor)} />
                 <h3 className="text-lg font-semibold">You are a <span className={tierTextColor}>{userTier} Tier</span> Freelancer</h3>
                 <p className="text-sm text-muted-foreground">
                    This gives you priority access to projects and marks you as top talent.
                </p>
            </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center h-full">
        {isVerified ? (
            <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Profile Verified</h3>
            <p className="text-sm text-muted-foreground">
                Your identity has been successfully verified, increasing client trust.
            </p>
            </>
        ) : (
            <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShieldAlert className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Verify Your Profile</h3>
            <p className="text-sm text-muted-foreground">
                Increase client trust and unlock more opportunities by verifying your identity.
            </p>
            <Button className="mt-2">Start Verification</Button>
            </>
        )}
        </div>
    </div>
  );
}
