"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SURFACES, ACTIVITY } from "@/lib/mock-data"
import { surfaceLabel } from "@/components/surface-icon"
import type { SurfaceType } from "@/lib/types"
import { ShieldIcon, PlusIcon, CircleAlertIcon, TriangleAlertIcon } from "lucide-react"

const surfaceEmojis: Record<SurfaceType, string> = {
  github: "GH",
  slack: "SL",
  notion: "NT",
  docker: "DK",
  s3: "S3",
  jira: "JR",
}

const severityColors = {
  critical: "text-red-400",
  high: "text-amber-400",
  medium: "text-blue-400",
  success: "text-emerald-400",
}

const severityDot = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-blue-500",
  success: "bg-emerald-500",
}

export function LeftSidebar() {
  const connected = SURFACES.filter((s) => s.connected)
  const disconnected = SURFACES.filter((s) => !s.connected)
  const recentAlerts = ACTIVITY.filter((a) => a.severity === "critical" || a.severity === "high").slice(0, 3)

  return (
    <div className="w-[220px] min-w-[220px] bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center">
          <ShieldIcon className="w-4 h-4 text-foreground" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-none">SecretSentry</div>
          <div className="text-[10px] text-muted-foreground mt-1">Threat Intelligence</div>
        </div>
        <Badge className="ml-auto text-[9px] py-0 px-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">
          AI
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        {/* Connected surfaces */}
        <div className="px-3 pt-4 pb-1">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Connected surfaces
          </p>
          <div className="flex flex-col gap-0.5">
            {connected.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-secondary cursor-pointer border-l-2 border-emerald-500"
              >
                <div className="w-6 h-6 rounded border border-border bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                  {surfaceEmojis[s.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium leading-none">{surfaceLabel(s.type)}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    {s.lastScan === "Scanning now" ? "● Scanning now" : `${s.lastScan}`}
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(34,197,94,0.8)] flex-shrink-0" />
              </div>
            ))}

            {disconnected.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-secondary cursor-pointer border-l-2 border-border opacity-50"
              >
                <div className="w-6 h-6 rounded border border-border bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                  {surfaceEmojis[s.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-muted-foreground leading-none">{surfaceLabel(s.type)}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Not connected</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
              </div>
            ))}

            <button className="flex items-center gap-2 px-2 py-2 text-muted-foreground hover:text-foreground text-xs cursor-pointer rounded-md hover:bg-secondary w-full">
              <PlusIcon className="w-3.5 h-3.5" />
              Connect a surface
            </button>
          </div>
        </div>

        <Separator className="my-3 mx-3 w-auto" />

        {/* Recent alerts */}
        <div className="px-3 pb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Recent alerts
          </p>
          <div className="flex flex-col gap-0.5">
            {recentAlerts.map((a) => (
              <div
                key={a.id}
                className={`px-2 py-2 rounded-md cursor-pointer hover:bg-secondary border-l-2 ${
                  a.severity === "critical" ? "border-red-500" : "border-amber-500"
                }`}
              >
                <div className="flex items-start gap-1.5">
                  {a.severity === "critical" ? (
                    <CircleAlertIcon className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <TriangleAlertIcon className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-medium leading-tight line-clamp-1">{a.text}</div>
                    <div className={`text-[10px] mt-0.5 ${severityColors[a.severity]}`}>
                      {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)} · {a.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Org bottom */}
      <div className="border-t border-border p-3 flex items-center gap-2.5">
        <Avatar className="w-7 h-7 rounded-md">
          <AvatarFallback className="rounded-md text-[10px] font-bold bg-secondary border border-border">
            AC
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xs font-semibold leading-none">Acme Corp</div>
          <div className="text-[10px] text-muted-foreground mt-1">Pro plan</div>
        </div>
      </div>
    </div>
  )
}
