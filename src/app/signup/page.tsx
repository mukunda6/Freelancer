
import { SignupForm } from '@/components/auth/signup-form';
import { Suspense } from 'react';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </main>
  );
}
