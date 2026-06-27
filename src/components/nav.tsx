"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldIcon, LayoutDashboardIcon, AlertTriangleIcon, PlugIcon, UsersIcon, BarChart2Icon, BellIcon, SettingsIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { href: "/", label: "OVERVIEW", icon: LayoutDashboardIcon },
  { href: "/chat", label: "AI AGENT", icon: ShieldIcon, badge: "LIVE" },
  { href: "/findings", label: "FINDINGS", icon: AlertTriangleIcon, badge: "47" },
  { href: "/connectors", label: "CONNECTORS", icon: PlugIcon },
  { href: "/developers", label: "DEVELOPERS", icon: UsersIcon },
]

const BOTTOM_NAV = [
  { href: "/reports", label: "REPORTS", icon: BarChart2Icon },
  { href: "/alerts", label: "ALERTS", icon: BellIcon },
  { href: "/settings", label: "SETTINGS", icon: SettingsIcon },
]

export function Nav() {
  const path = usePathname()

  return (
    <nav className="w-14 min-w-14 bg-card border-r border-border flex flex-col items-center py-3 gap-1">
      {/* Logo */}
      <div className="w-8 h-8 rounded border border-border bg-secondary flex items-center justify-center mb-3">
        <ShieldIcon className="w-4 h-4 text-foreground" />
      </div>
      <Separator className="w-8 mb-1" />

      {NAV.map(({ href, label, icon: Icon, badge }) => {
        const active = path === href
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={`relative w-10 h-10 rounded flex items-center justify-center transition-colors group
              ${active ? "bg-secondary border border-border text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          >
            <Icon className="w-4 h-4" />
            {badge && (
              <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-red-500 text-white rounded px-1 leading-tight">
                {badge === "LIVE" ? "●" : badge}
              </span>
            )}
            <span className="absolute left-12 bg-card border border-border text-foreground text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
              {label}
            </span>
          </Link>
        )
      })}

      <div className="flex-1" />
      <Separator className="w-8 mb-1" />

      {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
        const active = path === href
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={`relative w-10 h-10 rounded flex items-center justify-center transition-colors group
              ${active ? "bg-secondary border border-border text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          >
            <Icon className="w-4 h-4" />
            <span className="absolute left-12 bg-card border border-border text-foreground text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
              {label}
            </span>
          </Link>
        )
      })}

      {/* Org */}
      <div className="w-8 h-8 rounded border border-border bg-secondary flex items-center justify-center mt-2">
        <span className="text-[9px] font-bold text-muted-foreground">AC</span>
      </div>
    </nav>
  )
}
