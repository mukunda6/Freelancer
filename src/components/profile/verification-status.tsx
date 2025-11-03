
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export function AccountStatus() {
  const isVerified = false; // Mock status

  return (
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
            Increase client trust by verifying your identity with our secure partner, Stripe Identity.
          </p>
          <Button className="mt-2">Start Verification</Button>
        </>
      )}
    </div>
  );
}
