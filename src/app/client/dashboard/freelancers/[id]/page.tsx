
'use client';

import { useParams } from 'next/navigation';
import { competitors, projects, type Project } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, Crown, Award, Shield, DollarSign, Star, TrendingUp, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/projects/project-card';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ProjectDetailDialog } from '@/components/projects/project-detail-dialog';

const tierConfig = {
  Gold: {
    icon: Crown,
    textColor: "text-yellow-400",
  },
  Silver: {
    icon: Award,
    textColor: "text-slate-400",
  },
  Bronze: {
    icon: Shield,
    textColor: "text-amber-700",
  },
};

export default function FreelancerProfilePage() {
  const params = useParams();
  const freelancerId = params.id as string;
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const freelancer = React.useMemo(() => {
    return competitors.find((c) => c.id === freelancerId)
  }, [freelancerId]);

  const freelancerProjects = React.useMemo(() => {
    if (!freelancer) return [];
    // Correctly filter for portfolio projects owned by the freelancer
    return projects.filter(p => p.postedBy === freelancer.name);
  }, [freelancer]);
  
  if (!freelancer) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Freelancer not found</h1>
        <p className="text-muted-foreground">This freelancer could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/client/dashboard">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const config = tierConfig[freelancer.tier];
  const Icon = config.icon;

  return (
    <>
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Button variant="ghost" asChild>
            <Link href="/client/dashboard">
              <ArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="items-center text-center">
              <Avatar className="h-28 w-28 mb-4 border-4 border-primary">
                <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{freelancer.name}</CardTitle>
              <CardDescription>{freelancer.specialty}</CardDescription>
               <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                <Icon className={`w-6 h-6 ${config.textColor}`} />
                <span className={`font-bold text-md ${config.textColor}`}>{freelancer.tier} Tier</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {freelancer.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-center">
              <div className="grid grid-cols-2 gap-4 pt-4 border-t text-left">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Earned</p>
                        <p className="font-semibold text-foreground">${freelancer.earnings.toLocaleString('en-US')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Rank</p>
                        <p className="font-semibold text-foreground">#{freelancer.rank}</p>
                    </div>
                  </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                  <h4 className="font-semibold text-left">Contact Information</h4>
                  <div className="flex flex-col gap-2">
                     <Button variant="outline" className="w-full justify-start">
                        <Mail className="mr-2" />
                        <span>Send Email</span>
                     </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="mr-2" />
                        <span>Call Now</span>
                      </Button>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-accent" />
                Portfolio Projects
              </CardTitle>
              <CardDescription>A selection of {freelancer.name}'s past work.</CardDescription>
            </CardHeader>
            <CardContent>
              {freelancerProjects.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-1">
                  {freelancerProjects.map(project => (
                    <ProjectCard key={project.id} project={project} onCardClick={() => setSelectedProject(project)} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">This freelancer hasn't added any projects to their portfolio yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    {selectedProject && (
        <ProjectDetailDialog
            project={selectedProject}
            open={!!selectedProject}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setSelectedProject(null);
                }
            }}
        />
    )}
    </>
  );
}
