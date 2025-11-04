
'use client';

import Image from 'next/image';
import type { Project } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, DollarSign, CheckCircle2, Wrench, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectDetailDialog({ project, open, onOpenChange }: { project: Project; open: boolean; onOpenChange: (open: boolean) => void; }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <ScrollArea className="max-h-[80vh] pr-6">
          <DialogHeader className="pr-0">
            <Badge variant="secondary" className="w-fit mb-2">{project.category}</Badge>
            <DialogTitle className="font-headline text-3xl">{project.title}</DialogTitle>
          </DialogHeader>
          
          <div className="my-6">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                />
            </div>
          </div>

           {/* Demo Video Card */}
           {project.videoUrl && (
            <Card className='mb-6'>
                <CardHeader>
                <div className="flex items-center gap-3">
                    <Video className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">Project Demo</CardTitle>
                </div>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video w-full bg-slate-900 rounded-lg overflow-hidden">
                        <video
                            key={project.videoUrl}
                            className="w-full h-full"
                            controls
                            autoPlay
                            muted
                            playsInline
                        >
                        <source src={project.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    </div>
                </CardContent>
            </Card>
           )}
          
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
                    <p className="font-semibold text-foreground">${project.budget.toLocaleString('en-US')}</p>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
