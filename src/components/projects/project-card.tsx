import Image from "next/image";
import type { Project } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { ArrowRight, Building } from "lucide-react";

export function ProjectCard({ project, isClientView = false }: { project: Project, isClientView?: boolean }) {
  return (
    <Link href={isClientView ? `/client/dashboard/proposals` : `/dashboard/projects/${project.id}`} className="flex">
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full hover:border-primary">
        <div className="relative aspect-video w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{project.postedBy}</span>
          </div>
          <CardTitle className="font-headline text-lg pt-1">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3 font-medium">
            <span className="text-foreground">Impact: </span>{project.impact}
          </p>
        </CardContent>
        <CardFooter className="pt-4 flex justify-between items-center bg-secondary/30 p-4">
           <Badge variant="secondary" className="w-fit">{project.category}</Badge>
           <div className="text-sm font-semibold text-primary flex items-center gap-1">
             View Project <ArrowRight className="h-4 w-4" />
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
