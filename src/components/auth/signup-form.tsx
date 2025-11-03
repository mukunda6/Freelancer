
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Users, Building } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'client' ? 'client' : 'freelancer';
  const [role, setRole] = React.useState(initialRole);
  
  const freelancerImage = PlaceHolderImages.find(p => p.id === 'signup-freelancer');
  const clientImage = PlaceHolderImages.find(p => p.id === 'signup-client');


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd perform registration here.
    // For this demo, we'll navigate to the correct dashboard.
    if (role === 'client') {
        router.push("/client/dashboard");
    } else {
        router.push("/dashboard");
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full shadow-xl">
      <CardHeader className="text-center">
         <Link href="/">
          <Logo className="mx-auto mb-4" />
        </Link>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join as a freelancer or a client to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="grid gap-4">
          <div className="grid gap-2">
            <Label>I am a...</Label>
            <div className="grid grid-cols-2 gap-4">
               <div
                onClick={() => setRole('freelancer')}
                className={cn(
                  "relative group rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square text-center",
                  "hover:shadow-lg hover:scale-105",
                  role === 'freelancer' ? "border-primary shadow-lg scale-105" : "border-muted"
                )}
              >
                {freelancerImage && (
                    <Image
                      src={freelancerImage.imageUrl}
                      alt="Freelancer"
                      fill
                      className="object-cover rounded-md opacity-20 group-hover:opacity-30 transition-opacity"
                      data-ai-hint={freelancerImage.imageHint}
                    />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <Users className="w-8 h-8 mb-2 text-primary" />
                  <span className="font-semibold text-sm">Freelancer</span>
                </div>
              </div>

               <div
                onClick={() => setRole('client')}
                className={cn(
                  "relative group rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square text-center",
                  "hover:shadow-lg hover:scale-105",
                  role === 'client' ? "border-accent shadow-lg scale-105" : "border-muted"
                )}
              >
                {clientImage && (
                  <Image
                    src={clientImage.imageUrl}
                    alt="Client"
                    fill
                    className="object-cover rounded-md opacity-20 group-hover:opacity-30 transition-opacity"
                    data-ai-hint={clientImage.imageHint}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <Building className="w-8 h-8 mb-2 text-accent" />
                    <span className="font-semibold text-sm">Client</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={role === 'client' ? '/client/login' : '/login'} className="font-semibold text-primary/80 hover:text-primary hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
