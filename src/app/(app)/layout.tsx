"use client"

import React from "react"
import Link from "next/link"
import {
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  User,
  UserCircle,
  ClipboardPlus,
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { usePathname } from "next/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
                <SidebarMenuButton
                  isActive={isActive("/dashboard")}
                  icon={<LayoutDashboard />}
                  tooltip="Dashboard"
                >
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/post-job">
                <SidebarMenuButton
                  isActive={isActive("/post-job")}
                  icon={<ClipboardPlus />}
                  tooltip="Post a Job"
                >
                  Post a Job
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/find-candidates">
                <SidebarMenuButton
                  isActive={isActive("/find-candidates")}
                  icon={<BrainCircuit />}
                  tooltip="Find Candidates"
                >
                  Find Candidates
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/messages">
                <SidebarMenuButton
                  isActive={isActive("/messages")}
                  icon={<MessageSquare />}
                  tooltip="Messages"
                >
                  Messages
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <Link href="/profile">
                  <SidebarMenuButton
                    isActive={isActive("/profile")}
                    icon={<UserCircle />}
                    tooltip="Profile"
                  >
                    Profile
                  </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <UserCircle />
            </Button>
            <div className="flex flex-col group-data-[state=collapsed]:hidden">
              <span className="text-sm font-semibold">Dr. Maria Dela Cruz</span>
              <span className="text-xs text-muted-foreground">
                Cardiologist
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="relative ml-auto flex-1 md:grow-0">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
