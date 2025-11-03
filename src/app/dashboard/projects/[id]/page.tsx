'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects, testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const project = projects.find((p) => p.id === projectId);
  const testimonial = testimonials.find((t) => t.projectId === projectId);
  
  if (!project) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">This project could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/projects">
            <ArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  const clientAvatar = testimonials.find(t => t.projectId === project.id)?.clientAvatar || `https://picsum.photos/seed/${project.postedBy.replace(/\s+/g, '')}/100/100`;


  const projectSkills = project.skills || [];

  return (
    <div className="container mx-auto max-w-6xl py-8">
       <div className="mb-8">
        <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
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
            <p className="mt-2 text-lg text-muted-foreground">
              For <span className="font-semibold text-foreground">{project.postedBy}</span>
            </p>
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
          
           {/* Testimonial */}
           {testimonial && (
            <Card className="bg-secondary/50">
              <CardHeader className="flex flex-row items-start gap-4">
                 <Avatar className="h-12 w-12 border">
                    <AvatarImage src={testimonial.clientAvatar} alt={testimonial.clientName} />
                    <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">{testimonial.clientName}</CardTitle>
                  <CardDescription>{testimonial.clientTitle}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-foreground italic">"{testimonial.quote}"</blockquote>
              </CardContent>
            </Card>
          )}

          {/* Project Description */}
          <Card>
             <CardHeader>
                <CardTitle className="font-headline">Project Details</CardTitle>
             </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg">Problem</h3>
              <p className="text-muted-foreground">{project.description}</p>
               <h3 className="font-semibold text-lg mt-4">Solution & Impact</h3>
               <p className="text-muted-foreground">{project.impact}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="sticky top-24">
             <CardHeader className="text-center items-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-accent">
                    <AvatarImage src={clientAvatar} alt={project.postedBy} />
                    <AvatarFallback>{project.postedBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">{project.postedBy}</CardTitle>
                <CardDescription>Client</CardDescription>
             </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Project Budget</h4>
                    <p className="text-lg font-bold text-primary">${project.budget.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Category</h4>
                    <Badge variant="secondary">{project.category}</Badge>
                </div>

                 <Button className="w-full" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      View Project Live
                      <ExternalLink className="ml-2" />
                    </Link>
                 </Button>
                 <Button className="w-full" asChild>
                    <Link href={`mailto:contact@${project.postedBy.replace(/\s+/g, '').toLowerCase()}.com`}>
                      <Mail className="mr-2" />
                      Contact Client
                    </Link>
                 </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
