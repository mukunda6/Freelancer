import Image from "next/image";
import type { Project } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
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
        <Badge variant="secondary" className="w-fit">{project.category}</Badge>
        <CardTitle className="font-headline text-lg pt-2">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center bg-secondary/30 p-4">
        <div className="text-xl font-bold text-primary">${project.budget.toLocaleString()}</div>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
