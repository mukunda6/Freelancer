"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  FilePlus,
  Trophy,
  Search,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navItems = [
  { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/dashboard/projects', label: 'My Projects', icon: Briefcase },
  { href: '/client/dashboard/proposals', label: 'Proposals', icon: FileText },
];

const actionItem = { href: '/client/dashboard/project-competition', label: 'Post Competition', icon: Trophy };

export function ClientNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href === '/client/dashboard' ? pathname === item.href : true)}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname === actionItem.href}
          className="justify-start bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
        >
          <Link href={actionItem.href}>
            <actionItem.icon className="h-5 w-5 mr-3" />
            <span>{actionItem.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
