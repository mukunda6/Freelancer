import { LoginForm } from '@/components/auth/login-form';

export default function ClientLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm userType="client" />
    </main>
  );
}
