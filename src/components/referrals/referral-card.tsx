
"use client";

import type { Referral } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "../ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ReferralCard({ referral: initialReferral }: { referral: Referral }) {
  const [referral, setReferral] = useState(initialReferral);
  const { toast } = useToast();

  const getBadgeVariant = (status: 'Pending' | 'Accepted' | 'Declined'): VariantProps<typeof badgeVariants>['variant'] => {
    switch (status) {
      case 'Accepted':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Declined':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  const handleAccept = () => {
    setReferral({ ...referral, status: 'Accepted' });
    toast({
      title: "Referral Accepted!",
      description: `${referral.clientName} has been notified and will be added to your profile.`,
    });
  };

  const handleDecline = () => {
    setReferral({ ...referral, status: 'Declined' });
     toast({
      title: "Referral Declined",
      description: `The referral from ${referral.clientName} has been declined.`,
      variant: 'destructive'
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={referral.clientAvatar} alt={referral.clientName} />
          <AvatarFallback>{referral.clientName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">
            Referral from {referral.clientName}
          </CardTitle>
          <CardDescription>{referral.date}</CardDescription>
        </div>
        <Badge variant={getBadgeVariant(referral.status)}>
          {referral.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground italic border-l-4 pl-4 py-2 bg-secondary/30">"{referral.projectDescription}"</p>
      </CardContent>
      {referral.status === 'Pending' && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            <X className="mr-2 h-4 w-4" /> Decline
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleAccept}>
            <Check className="mr-2 h-4 w-4" /> Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
