
"use client";

import type { Proposal } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, MessageCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ProposalCard({ proposal: initialProposal }: { proposal: Proposal }) {
  const [proposal, setProposal] = useState(initialProposal);
  const { toast } = useToast();

  const handleAccept = () => {
    setProposal({ ...proposal, status: 'Accepted' });
    toast({
      title: "Proposal Accepted!",
      description: `You have accepted the proposal from ${proposal.freelancerName}.`,
    });
  };

  const handleDecline = () => {
    setProposal({ ...proposal, status: 'Declined' });
     toast({
      title: "Proposal Declined",
      description: `You have declined the proposal from ${proposal.freelancerName}.`,
      variant: 'destructive'
    });
  };


  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={proposal.freelancerAvatar} alt={proposal.freelancerName} />
          <AvatarFallback>{proposal.freelancerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">
            {proposal.freelancerName}
          </CardTitle>
          <CardDescription>Applied for: {proposal.projectName}</CardDescription>
        </div>
        <div className="text-right">
            <div className="text-xl font-bold text-primary">${proposal.bid.toLocaleString()}</div>
            <Badge variant={proposal.status === 'Accepted' ? 'default' : proposal.status === 'Declined' ? 'destructive' : 'secondary'} className="mt-1">
                {proposal.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground italic border-l-4 pl-4 py-2 bg-secondary/30">"{proposal.coverLetter}"</p>
      </CardContent>
      {proposal.status === 'Pending' && (
        <CardFooter className="flex justify-end gap-2">
           <Button variant="outline" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" /> Message
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDecline}>
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
