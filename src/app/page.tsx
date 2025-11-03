import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Users, FileText } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Sign Up <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/10 via-background to-accent/10">
           <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzYyMjA4MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080')",
            }}
            data-ai-hint="business team"
          />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Freelance Career, Supercharged.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6">
              Freelancer Hub is the all-in-one platform to find projects, manage clients, and grow your independent business.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started for Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Why Freelancer Hub?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Everything you need to succeed as a freelancer, all in one place.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 mt-12 sm:grid-cols-2 md:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                     <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-headline">Find Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Access a curated list of high-quality projects from trusted clients.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-headline">Manage Clients</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of all your client communications, milestones, and invoices seamlessly.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                 <div className="flex justify-center items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-headline">Effortless Invoicing</h3>
                <p className="text-sm text-muted-foreground">
                  Create and send professional invoices in minutes and get paid on time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-20 md:py-24 bg-secondary/50">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              Ready to Take Control of Your Freelance Career?
            </h2>
            <p className="text-muted-foreground">Join thousands of successful freelancers on our platform.</p>
            <Button asChild size="lg" className="mx-auto mt-4">
              <Link href="/signup">
                Sign Up Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-muted py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Freelancer Hub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}