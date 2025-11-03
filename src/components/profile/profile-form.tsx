"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function ProfileForm() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <form className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userAvatar?.imageUrl} alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="grid gap-1.5 flex-1">
          <Label htmlFor="picture">Profile Picture</Label>
          <Input id="picture" type="file" className="w-full" />
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline</Label>
          <Input id="headline" defaultValue="Full-Stack Web Developer" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input id="skills" defaultValue="React, Next.js, TypeScript, Node.js, Firebase" />
        <p className="text-xs text-muted-foreground">Comma-separated skills.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          defaultValue="Experienced full-stack developer with a passion for building scalable and user-friendly web applications. Proficient in modern JavaScript frameworks and cloud technologies."
          className="min-h-[120px]"
        />
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </form>
  );
}
