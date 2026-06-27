"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { STATS, ACTIVITY, SURFACES } from "@/lib/mock-data"
import { surfaceLabel } from "@/components/surface-icon"

const activityDot: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-blue-500",
  success: "bg-emerald-500",
}

export function RightPanel() {
  const connected = SURFACES.filter((s) => s.connected)

  return (
    <div className="w-[240px] min-w-[240px] bg-card border-l border-border flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <p className="text-sm font-semibold">Live overview</p>
      </div>

      <ScrollArea className="flex-1">
        {/* Stats */}
        <div className="p-3 border-b border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Right now</p>
          <div className="grid grid-cols-2 gap-2">
            <Card className="shadow-none border-border bg-background">
              <CardContent className="p-2.5">
                <div className="text-xl font-black text-red-400 leading-none">{STATS.critical}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Critical</div>
              </CardContent>
            </Card>
            <Card className="shadow-none border-border bg-background">
              <CardContent className="p-2.5">
                <div className="text-xl font-black leading-none">{STATS.total}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Detected</div>
              </CardContent>
            </Card>
            <Card className="shadow-none border-border bg-background">
              <CardContent className="p-2.5">
                <div className="text-xl font-black text-amber-400 leading-none">{STATS.avgBlastScore}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Avg score</div>
              </CardContent>
            </Card>
            <Card className="shadow-none border-border bg-background">
              <CardContent className="p-2.5">
                <div className="text-xl font-black text-emerald-400 leading-none">{STATS.remediated}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Fixed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scan status */}
        <div className="p-3 border-b border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Scan status
          </p>
          <div className="flex flex-col gap-2">
            {connected.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      s.lastScan === "Scanning now"
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-emerald-500"
                    }`}
                  />
                  {surfaceLabel(s.type)}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {s.lastScan === "Scanning now" ? (
                    <Badge className="text-[9px] py-0 px-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">
                      scanning
                    </Badge>
                  ) : (
                    s.lastScan
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="p-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
            Activity feed
          </p>
          <div className="flex flex-col">
            {ACTIVITY.map((a, i) => (
              <div key={a.id}>
                {i > 0 && <Separator className="my-2" />}
                <div className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${activityDot[a.severity]}`} />
                  <div>
                    <p className="text-[11.5px] text-foreground leading-tight">{a.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
