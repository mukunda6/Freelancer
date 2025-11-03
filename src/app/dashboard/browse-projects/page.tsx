
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data";

export default function BrowseProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Browse Projects</h1>
          <p className="text-muted-foreground max-w-2xl">
            Find your next opportunity. Browse projects from clients looking for your skills.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
