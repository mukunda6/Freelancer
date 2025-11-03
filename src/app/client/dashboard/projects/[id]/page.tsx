
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects, proposals as allProposals } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, DollarSign, FileText } from 'lucide-react';
import { ProposalCard } from '@/components/client/proposal-card';

export default function ClientProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const project = projects.find((p) => p.id === projectId);
  const proposalsForProject = allProposals.filter(p => p.projectName === project?.title);

  if (!project) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">This project could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/client/dashboard/projects">
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/client/dashboard/projects">
            <ArrowLeft className="mr-2" />
            Back to Your Projects
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{project.category}</Badge>
              <CardTitle className="font-headline text-3xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={project.imageHint}
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Project Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
              
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
                 <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-semibold text-foreground">${project.budget.toLocaleString()}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold text-foreground">{project.duration}</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <FileText className="h-6 w-6 text-accent" />
              <div>
                <CardTitle className="font-headline">Proposals</CardTitle>
                <CardDescription>{proposalsForProject.length} received</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposalsForProject.length > 0 ? (
                proposalsForProject.map(proposal => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground py-8">No proposals received yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
