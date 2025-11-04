'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, ChangeEvent } from 'react';
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
import { ArrowLeft, Clock, CheckCircle2, Video, Upload, Star, DollarSign, Wrench } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProjectDetailPage({ params: paramsProp }: { params: { id: string } }) {
  const params = React.use(paramsProp);
  const projectId = params.id;
  const project = projects.find((p) => p.id === projectId);

  // We use a state to manage the video source to allow for uploads,
  // but we initialize it directly from the project data.
  const [videoSrc, setVideoSrc] = useState<string | null>(project?.videoUrl || null);

  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newVideoUrl = URL.createObjectURL(file);
      setVideoSrc(newVideoUrl);

      // In a real app, you'd upload this to a storage service and save the URL.
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex !== -1) {
        projects[projectIndex].videoUrl = newVideoUrl;
      }
    }
  };

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
  
  const clientAvatarUrl = `https://picsum.photos/seed/${project.postedBy.replace(/\s+/g, '')}/100/100`;

  return (
    <div className="container mx-auto max-w-6xl py-8">
       <div className="mb-8">
        <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">
                <ArrowLeft className="mr-2" />
                Back to My Projects
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
          
           {/* Demo Video Card */}
           <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline">Project Demo Video</CardTitle>
              </div>
              <CardDescription>
                Upload a video to showcase your project. This helps clients understand the value you delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {videoSrc ? (
                    <div className="relative aspect-video w-full bg-slate-900 rounded-lg overflow-hidden">
                        <video
                            key={videoSrc} // Add key to force re-render when src changes
                            className="w-full h-full"
                            controls
                            autoPlay
                            muted
                            playsInline
                        >
                          <source src={videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <div className="relative aspect-video w-full bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                        <p className="text-muted-foreground">No video uploaded.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="video-upload" className="cursor-pointer">
                        <Button asChild variant="outline">
                           <div>
                             <Upload className="mr-2" />
                             {videoSrc ? 'Change Video' : 'Upload Video'}
                           </div>
                        </Button>
                    </Label>
                    <Input id="video-upload" type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </div>
            </CardFooter>
          </Card>


          {/* Full Project Description */}
          <Card>
             <CardHeader>
                <CardTitle className="font-headline">Full Project Description</CardTitle>
                 <CardDescription>A comprehensive breakdown of the project goals, execution, and outcomes.</CardDescription>
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
                    <h3 className="font-semibold text-lg mb-2">Key Features Implemented</h3>
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
                 <div className="space-y-2 pt-4 border-t col-span-2">
                    <h4 className="font-semibold text-muted-foreground">My Rating</h4>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < project.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-foreground">{project.rating.toFixed(1)}</span>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
