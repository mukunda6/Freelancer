
'use client';

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
import { ArrowLeft, Clock, DollarSign, FileText, CheckCircle2, Wrench } from 'lucide-react';
import { ProposalCard } from '@/components/client/proposal-card';
import { Separator } from '@/components/ui/separator';

export default function ClientProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

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

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Project Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Technical Requirements</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.requirements}</p>
                </div>
                 <Separator />
                 <div>
                    <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                    {project.features.split('\n').map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>{feature.replace('- ', '')}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                 <Separator />
                 <div>
                  <h3 className="font-semibold text-lg mb-2">Solution & Impact</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.impact}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
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
                 <div className="flex items-center gap-2 col-span-2 lg:col-span-1">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Skills</p>
                        <p className="font-semibold text-foreground">{project.skills.join(', ')}</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
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
