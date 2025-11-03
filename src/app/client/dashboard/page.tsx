
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, FilePlus, Users, Trophy, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { competitions, competitors } from "@/lib/data";
import { CompetitionCard } from "@/components/client/competition-card";
import { FreelancerTierCard } from "@/components/client/freelancer-tier-card";

export default function ClientDashboardPage() {
  const goldFreelancers = competitors.filter(c => c.tier === 'Gold');
  const silverFreelancers = competitors.filter(c => c.tier === 'Silver');
  const bronzeFreelancers = competitors.filter(c => c.tier === 'Bronze');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Client Dashboard</h1>
        <Button asChild>
          <Link href="/client/dashboard/projects/new">
            <FilePlus className="mr-2" />
            Post New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">You have 2 ongoing projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposals Received</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 in the last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500</div>
            <p className="text-xs text-muted-foreground">Across 5 projects</p>
          </CardContent>
        </Card>
      </div>
      
       <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-headline font-bold">Top Freelancers</h2>
          <p className="text-muted-foreground">Discover our elite freelancers, who are given top priority. These are the most trusted and skilled professionals on our platform.</p>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-yellow-500">Gold Tier</h3>
            <div className="grid gap-6 md:grid-cols-2">
                {goldFreelancers.map(freelancer => (
                    <FreelancerTierCard key={freelancer.id} freelancer={freelancer} />
                ))}
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-slate-400">Silver Tier</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {silverFreelancers.map(freelancer => (
                    <FreelancerTierCard key={freelancer.id} freelancer={freelancer} />
                ))}
            </div>
        </div>
         <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight text-amber-700">Bronze Tier</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bronzeFreelancers.map(freelancer => (
                    <FreelancerTierCard key={freelancer.id} freelancer={freelancer} />
                ))}
            </div>
        </div>
      </div>


      <div className="grid gap-6 lg:grid-cols-2 pt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              <CardTitle className="font-headline">Active Competitions</CardTitle>
            </div>
            <CardDescription>
              Manage your ongoing project competitions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-1">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>
              Latest proposals and messages on your projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Activity feed coming soon...</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
