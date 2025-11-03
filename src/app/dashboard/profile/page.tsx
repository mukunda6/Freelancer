import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProfileForm } from '@/components/profile/profile-form';
import { VerificationStatus } from '@/components/profile/verification-status';
import { TranslationTool } from '@/components/profile/translation-tool';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold tracking-tight">Profile & Settings</h1>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Public Profile</CardTitle>
              <CardDescription>Update your public profile and personal details.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profile Bio Translation</CardTitle>
              <CardDescription>Translate your bio for a global audience using AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <TranslationTool />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <VerificationStatus />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
