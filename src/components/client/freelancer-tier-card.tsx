
import type { Competitor } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Shield, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tierConfig = {
  Gold: {
    icon: Crown,
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    shadowColor: "hover:shadow-yellow-500/10",
  },
  Silver: {
    icon: Award,
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
    shadowColor: "hover:shadow-slate-500/10",
  },
  Bronze: {
    icon: Shield,
    textColor: "text-amber-700",
    bgColor: "bg-amber-700/10",
    borderColor: "border-amber-700/20",
    shadowColor: "hover:shadow-amber-700/10",
  },
};

export function FreelancerTierCard({ freelancer }: { freelancer: Competitor }) {
  const config = tierConfig[freelancer.tier];
  const Icon = config.icon;

  return (
    <Card className={cn("flex flex-col transition-all duration-300", config.bgColor, config.borderColor, config.shadowColor, "shadow-md")}>
      <CardHeader className="flex-row items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
          <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="font-headline text-lg">{freelancer.name}</CardTitle>
          <CardDescription>{freelancer.specialty}</CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <Icon className={cn("w-5 h-5", config.textColor)} />
            <span className={cn("font-bold text-sm", config.textColor)}>{freelancer.tier} Tier</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex flex-wrap gap-2">
            {freelancer.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
        <p className="text-sm text-muted-foreground pt-2 border-t">
            <span className="font-semibold text-foreground">Total Earnings:</span> ${freelancer.earnings.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 bg-background/50">
        <Button variant="outline" size="sm">
            <User className="mr-2" />
            View Profile
        </Button>
        <Button size="sm">
            <Mail className="mr-2" />
            Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
