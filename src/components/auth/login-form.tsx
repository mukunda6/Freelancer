
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Users, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({ userType }: { userType: 'freelancer' | 'client' }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });

    if (userType === 'client') {
      router.push("/client/dashboard");
    } else {
      router.push("/dashboard");
    }
    
    setIsLoading(false);
  };

  const isClient = userType === 'client';

  return (
    <Card className="mx-auto max-w-sm w-full shadow-xl">
      <CardHeader className="text-center">
        <Link href="/">
          <Logo className="mx-auto mb-4" />
        </Link>
        <CardTitle className="text-2xl font-headline">
          {isClient ? 'Client Login' : 'Freelancer Login'}
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full ${isClient ? 'bg-accent/10' : 'bg-primary/10'}`}>
            {isClient ? (
              <Building className={`w-8 h-8 text-accent`} />
            ) : (
              <Users className={`w-8 h-8 text-primary`} />
            )}
          </div>
        </div>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              defaultValue="test@example.com"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm text-primary/80 hover:text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required defaultValue="password" />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href={`/signup?role=${userType}`} className="font-semibold text-primary/80 hover:text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
