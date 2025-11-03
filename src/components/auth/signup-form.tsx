"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'client' ? 'client' : 'freelancer';
  const [role, setRole] = React.useState(initialRole);


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
            <RadioGroup
              defaultValue={role}
              onValueChange={(value) => setRole(value as 'freelancer' | 'client')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="freelancer" id="freelancer" className="peer sr-only" />
                <Label
                  htmlFor="freelancer"
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                    role === 'freelancer' && "border-primary"
                  )}
                >
                  Freelancer
                </Label>
              </div>
              <div>
                <RadioGroupItem value="client" id="client" className="peer sr-only" />
                <Label
                  htmlFor="client"
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                    role === 'client' && "border-primary"
                    )}
                >
                  Client
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
