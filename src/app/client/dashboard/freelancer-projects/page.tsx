
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data";

export default function FreelancerProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Freelancer Projects</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse projects from our talented freelancers to find the right fit for your needs.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
