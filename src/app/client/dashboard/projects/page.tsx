
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FilePlus } from "lucide-react";

export default function ClientProjectsPage() {
  // Assuming these are projects posted by the client
  const clientProjects = projects.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Your Projects</h1>
         <Button asChild>
          <Link href="/client/dashboard/projects/new">
            <FilePlus className="mr-2" />
            Post New Project
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clientProjects.map((project) => (
          <ProjectCard key={project.id} project={project} isClientView={true} />
        ))}
      </div>
    </div>
  );
}
