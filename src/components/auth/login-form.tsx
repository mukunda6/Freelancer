"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Users, Building } from "lucide-react";

export function LoginForm({ userType: initialUserType = 'freelancer' }: { userType?: 'freelancer' | 'client' }) {
  const router = useRouter();
  const [role, setRole] = React.useState(initialUserType);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'client') {
      router.push("/client/dashboard");
    } else {
      router.push("/dashboard");
    }
  };
  
  React.useEffect(() => {
    setRole(initialUserType);
  }, [initialUserType]);

  return (
    <Card className="mx-auto max-w-sm w-full shadow-xl">
      <CardHeader className="text-center">
        <Link href="/">
          <Logo className="mx-auto mb-4" />
        </Link>
        <CardTitle className="text-2xl font-headline">
          Login to Your Account
        </CardTitle>
        <CardDescription>
          Select your role to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
              <div
              onClick={() => setRole('freelancer')}
              className={cn(
                  "rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square text-center",
                  "hover:shadow-lg hover:scale-105",
                  role === 'freelancer' ? "border-primary shadow-lg scale-105" : "border-muted bg-background"
              )}
              >
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <Users className="w-8 h-8 mb-2 text-primary" />
                  <span className="font-semibold text-sm">Freelancer</span>
              </div>
              </div>

              <div
              onClick={() => setRole('client')}
              className={cn(
                  "rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center aspect-square text-center",
                  "hover:shadow-lg hover:scale-105",
                  role === 'client' ? "border-accent shadow-lg scale-105" : "border-muted bg-background"
              )}
              >
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <Building className="w-8 h-8 mb-2 text-accent" />
                  <span className="font-semibold text-sm">Client</span>
              </div>
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm text-primary/80 hover:text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login as {role === 'freelancer' ? 'Freelancer' : 'Client'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary/80 hover:text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
