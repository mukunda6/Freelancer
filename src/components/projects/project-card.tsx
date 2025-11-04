
'use client';

import Image from "next/image";
import type { Project } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { ArrowRight, Building, DollarSign, Clock, Wrench, Star } from "lucide-react";

export function ProjectCard({ 
  project, 
  isClientView = false, 
  isBrowseView = false, 
  onCardClick 
}: { 
  project: Project, 
  isClientView?: boolean, 
  isBrowseView?: boolean,
  onCardClick?: (project: Project) => void 
}) {
  
  const getProjectUrl = () => {
    if (isClientView) {
      return `/client/dashboard/projects/${project.id}`;
    }
    if (isBrowseView) {
      return `/dashboard/client-projects/${project.id}`;
    }
    return `/dashboard/projects/${project.id}`;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (onCardClick) {
      e.preventDefault();
      onCardClick(project);
    }
  }
  
  const cardContent = (
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full hover:border-primary h-full">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={project.imageHint}
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{project.postedBy}</span>
            </div>
             <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{project.rating.toFixed(1)}</span>
            </div>
          </div>
          <CardTitle className="font-headline text-lg pt-1 group-hover:text-primary transition-colors">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
            </p>
             <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary/80" />
                    <span className="truncate"><span className="font-semibold text-foreground/90">Skills:</span> {project.skills.join(', ')}</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="pt-4 flex justify-between items-center bg-secondary/30 p-4 mt-auto">
           <Badge variant="secondary" className="w-fit">{project.category}</Badge>
           <div className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
             View Project <ArrowRight className="h-4 w-4" />
           </div>
        </CardFooter>
      </Card>
  );

  if (onCardClick) {
    return (
      <div onClick={handleCardClick} className="flex group cursor-pointer h-full">
        {cardContent}
      </div>
    );
  }
  
  return (
    <Link href={getProjectUrl()} className="flex group h-full">
      {cardContent}
    </Link>
  );
}
