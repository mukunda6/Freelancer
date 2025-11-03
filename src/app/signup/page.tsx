import { SignupForm } from '@/components/auth/signup-form';
import { Suspense } from 'react';

function SignupContent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <SignupForm />
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  )
}
