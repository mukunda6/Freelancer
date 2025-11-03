
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Briefcase,
  User,
  GitPullRequestArrow,
  FolderSearch,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects', icon: Briefcase },
  { href: '/dashboard/browse-projects', label: 'Browse Projects', icon: FolderSearch },
  { href: '/dashboard/referrals', label: 'Referrals', icon: GitPullRequestArrow },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col', className)} {...props}>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
             <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
              className="justify-start"
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
