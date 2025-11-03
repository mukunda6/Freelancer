
'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from '@/components/projects/project-card';
import { projects } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// These projects are posted by clients and are available for freelancers to apply to.
const availableClientProjects = projects.filter(p => p.postedBy !== 'Jane Doe');
const allCategories = [...new Set(availableClientProjects.map((p) => p.category))];
const allSkills = [...new Set(availableClientProjects.flatMap((p) => p.skills))];


export default function ClientProjectsPage() {
  const [category, setCategory] = useState('all');
  const [skill, setSkill] = useState('all');
  const [budget, setBudget] = useState([0, 10000]);

  const filteredProjects = useMemo(() => {
    return availableClientProjects.filter((project) => {
      const categoryMatch =
        category === 'all' || project.category === category;
      const skillMatch = skill === 'all' || project.skills.includes(skill);
      const budgetMatch =
        project.budget >= budget[0] && project.budget <= budget[1];
      return categoryMatch && skillMatch && budgetMatch;
    });
  }, [category, skill, budget]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">
            Browse Client Projects
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Find your next opportunity. Filter projects by category, skills,
            and budget to match your expertise.
          </p>
        </div>
        <div>
           <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust the filters to find projects.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2 w-full md:w-auto">
                        <Label htmlFor="category-filter">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category-filter" className="w-full">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {allCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 w-full md:w-auto">
                        <Label htmlFor="skill-filter">Skill</Label>
                        <Select value={skill} onValueChange={setSkill}>
                            <SelectTrigger id="skill-filter" className="w-full">
                                <SelectValue placeholder="Filter by skill" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Skills</SelectItem>
                                {allSkills.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 w-full flex-1">
                        <Label>Budget Range: ${budget[0]} - ${budget[1]}</Label>
                        <Slider
                            min={0}
                            max={10000}
                            step={500}
                            value={budget}
                            onValueChange={(value) => setBudget(value)}
                        />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isBrowseView={true} />
          ))
        ) : (
          <p>No projects match the current filters.</p>
        )}
      </div>
    </div>
  );
}
