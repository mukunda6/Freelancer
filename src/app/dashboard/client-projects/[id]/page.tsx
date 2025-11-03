
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Mail, CheckCircle2, Video, Upload, Building, Star, DollarSign, Wrench } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ClientProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">This project could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/client-projects">
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }
  
  const clientAvatarUrl = `https://picsum.photos/seed/${project.postedBy.replace(/\s+/g, '')}/100/100`;

  return (
    <div className="container mx-auto max-w-6xl py-8">
       <div className="mb-8">
        <Button variant="ghost" asChild>
            <Link href="/dashboard/client-projects">
                <ArrowLeft className="mr-2" />
                Back to All Projects
            </Link>
        </Button>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Header */}
          <div>
            <Badge variant="secondary" className="mb-2">{project.category}</Badge>
            <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground">
              {project.title}
            </h1>
          </div>

          {/* Project Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint={project.imageHint}
              />
            </div>
          </Card>
          
          {/* Project Description */}
          <Card>
             <CardHeader>
                <CardTitle className="font-headline">Project Details</CardTitle>
             </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Problem Statement</h3>
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
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="sticky top-24">
             <CardHeader className="text-center items-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                    <AvatarImage src={clientAvatarUrl} alt={project.postedBy} />
                    <AvatarFallback>
                        {project.postedBy.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">{project.postedBy}</CardTitle>
                <CardDescription>Client</CardDescription>
             </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-sm">
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
                 <div className="flex items-center gap-2 col-span-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Skills</p>
                        <p className="font-semibold text-foreground">{project.skills.join(', ')}</p>
                    </div>
                </div>
              </div>

            </CardContent>
            <CardFooter>
                 <Button className="w-full" asChild>
                    <Link href="https://docs.google.com/forms/d/e/1FAIpQLSe_D-yM-1Vf1i1l-3A4t_5k9f6p8c_7X_7W_6Q/viewform" target="_blank">
                        Apply Now
                    </Link>
                 </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}


