import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProjectOverview } from '@/components/dashboard/project-overview';
import { InvoiceStatus } from '@/components/dashboard/invoice-status';
import { ProjectMilestones } from '@/components/dashboard/project-milestones';
import { ClientCommunication } from '@/components/dashboard/client-communication';
import { Briefcase, DollarSign, GitPullRequestArrow, TrendingUp } from 'lucide-react';
import { TopCompetitors } from '@/components/dashboard/top-competitors';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,200.00</div>
            <p className="text-xs text-muted-foreground">2 invoices waiting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Referrals</CardTitle>
            <GitPullRequestArrow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Waiting for your response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <TrendingUp className="h-4 w-4 textmuted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Project Overview</CardTitle>
             <CardDescription>A visual summary of your project progress.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ProjectOverview />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Invoice Status</CardTitle>
            <CardDescription>Manage your recent invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceStatus />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-4">
            <CardHeader>
                <CardTitle className="font-headline">Project Milestones</CardTitle>
                <CardDescription>Track the progress of your current projects.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProjectMilestones />
            </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Client Communication</CardTitle>
                <CardDescription>Review your latest messages.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientCommunication />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
