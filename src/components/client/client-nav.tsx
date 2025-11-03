
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  FilePlus,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navItems = [
  { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/dashboard/projects', label: 'My Projects', icon: Briefcase },
  { href: '/client/dashboard/proposals', label: 'Proposals', icon: FileText },
  { href: '/client/dashboard/freelancer-projects', label: 'Freelancer Projects', icon: User },
];

const actionItem = { href: '/client/dashboard/projects/new', label: 'Post Project', icon: FilePlus };

export function ClientNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === actionItem.href}
            className="justify-start bg-accent text-accent-foreground hover:bg-accent/90 mb-2"
          >
            <Link href={actionItem.href}>
              <actionItem.icon className="h-5 w-5 mr-3" />
              <span>{actionItem.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
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
