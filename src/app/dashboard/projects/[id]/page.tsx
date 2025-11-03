
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
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
import { ArrowLeft, Clock, Mail, CheckCircle2, Video, PlayCircle, Bot, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { generateVideo } from '@/ai/flows/generate-video-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { toast } = useToast();

  const project = projects.find((p) => p.id === projectId);
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    if (!project) return;
    setIsVideoLoading(true);
    setGeneratedVideoUrl(null);
    setVideoError(null);

    toast({
      title: "Video Generation Started 🎬",
      description: "The AI is warming up. This might take a minute or two, so please be patient.",
    });

    try {
      const result = await generateVideo({
        title: project.title,
        description: project.description,
      });
      setGeneratedVideoUrl(result.videoUrl);
      toast({
        title: "Video Generated! 🎉",
        description: "Your project demo video is ready.",
      });
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || "An unknown error occurred.";
      setVideoError(`Failed to generate video. ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Video Generation Failed",
        description: "There was a problem creating the video. Please check the console for more details.",
      });
    } finally {
      setIsVideoLoading(false);
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
                <Bot className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline">AI-Powered Demo Video</CardTitle>
              </div>
              <CardDescription>
                Generate a short, dynamic video to showcase this project's key features and impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isVideoLoading ? (
                <div className="relative aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center text-center">
                  <Skeleton className="absolute inset-0" />
                  <div className="relative z-10 p-4">
                     <p className="text-lg font-semibold text-foreground">Generating Video...</p>
                     <p className="text-sm text-muted-foreground mt-2">This can take up to a minute. Please wait.</p>
                     <div className="w-full bg-muted rounded-full h-2.5 mt-4 overflow-hidden">
                         <div className="bg-primary h-2.5 rounded-full w-full animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                     </div>
                  </div>
                </div>
              ) : generatedVideoUrl ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                  <video src={generatedVideoUrl} controls className="w-full h-full" />
                </div>
              ) : (
                <div className="relative aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  {videoError ? (
                    <Alert variant="destructive" className="max-w-md mx-auto">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Generation Error</AlertTitle>
                        <AlertDescription className="text-xs">{videoError}</AlertDescription>
                    </Alert>
                  ) : (
                     <div className="text-center text-muted-foreground">
                      <PlayCircle className="mx-auto h-12 w-12" />
                      <p className="mt-2 text-sm font-semibold">Generate a Demo</p>
                      <p className="text-xs">Click the button below to create an AI video.</p>
                  </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateVideo} disabled={isVideoLoading}>
                <Video className="mr-2" />
                {isVideoLoading ? 'Generating...' : generatedVideoUrl ? 'Regenerate Video' : 'Generate Video'}
              </Button>
            </CardFooter>
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
                    <AvatarImage src={userAvatar?.imageUrl} alt="Jane Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">Jane Doe</CardTitle>
                <CardDescription>Full-Stack Developer</CardDescription>
             </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                    <h4 className="font-semibold text-muted-foreground">Project Summary</h4>
                    <p className="text-sm text-foreground">
                      This {project.duration} project for {project.postedBy} was completed within a budget of ${project.budget.toLocaleString()} and delivered key features for their {project.category.toLowerCase()} needs.
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-2">
                      <h4 className="font-semibold text-muted-foreground">Category</h4>
                      <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <div className="space-y-2 text-right">
                      <h4 className="font-semibold text-muted-foreground">Duration</h4>
                      <div className="flex items-center gap-1.5 justify-end">
                        <Clock className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                  </div>
                </div>

                 <Button className="w-full" asChild>
                    <Link href="/dashboard/profile">
                      <Mail className="mr-2" />
                      View My Profile
                    </Link>
                 </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    