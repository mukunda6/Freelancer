
import Image from "next/image";
import type { Project } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { ArrowRight, Building, DollarSign, Clock, Wrench } from "lucide-react";

export function ProjectCard({ project, isClientView = false }: { project: Project, isClientView?: boolean }) {
  return (
    <Link href={isClientView ? `/client/dashboard/proposals` : `/dashboard/projects/${project.id}`} className="flex group">
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full hover:border-primary">
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{project.postedBy}</span>
          </div>
          <CardTitle className="font-headline text-lg pt-1 group-hover:text-primary transition-colors">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
                <span className="text-foreground font-semibold">Impact: </span>{project.impact}
            </p>
             <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary/80" />
                    <span><span className="font-semibold text-foreground/90">Budget:</span> ${project.budget.toLocaleString()}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/80" />
                    <span><span className="font-semibold text-foreground/90">Duration:</span> {project.duration}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary/80" />
                    <span className="truncate"><span className="font-semibold text-foreground/90">Skills:</span> {project.skills.join(', ')}</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="pt-4 flex justify-between items-center bg-secondary/30 p-4">
           <Badge variant="secondary" className="w-fit">{project.category}</Badge>
           <div className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
             View Project <ArrowRight className="h-4 w-4" />
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
