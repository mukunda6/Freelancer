
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navItems = [
  { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/dashboard/projects', label: 'Projects', icon: Briefcase },
  { href: '/client/dashboard/proposals', label: 'Proposals', icon: FileText },
  { href: '/client/dashboard/profile', label: 'Profile', icon: User },
];

export function ClientNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
             <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className="justify-start"
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
