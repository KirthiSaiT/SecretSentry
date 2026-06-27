"use client"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SevBadge } from "@/components/severity-badge"
import { FINDINGS, ACTIVITY, CONNECTORS } from "@/lib/data"
import { AlertTriangleIcon, ScanIcon, TrendingUpIcon, CheckCircleIcon } from "lucide-react"

const STATS = [
  { label: "CRITICAL FINDINGS", value: "3", sub: "+2 today", icon: AlertTriangleIcon, color: "text-red-400" },
  { label: "TOTAL DETECTED", value: "47", sub: "across 4 surfaces", icon: ScanIcon, color: "text-foreground" },
  { label: "AVG BLAST SCORE", value: "6.4", sub: "+1.2 this week", icon: TrendingUpIcon, color: "text-amber-400" },
  { label: "REMEDIATED", value: "39", sub: "83% resolution rate", icon: CheckCircleIcon, color: "text-emerald-400" },
]

export default function Overview() {
  const active = CONNECTORS.filter(c => c.status !== "DISCONNECTED")

  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-border px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground">SECRETSENTRY</span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-[10px] font-mono text-foreground">OVERVIEW</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              SYSTEM OPERATIONAL
            </span>
            <span>ACME CORP · PRO</span>
            <span>{new Date().toISOString().slice(0, 19).replace("T", " ")} UTC</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {STATS.map(({ label, value, sub, icon: Icon, color }) => (
              <Card key={label} className="rounded-none border-border bg-card shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[9px] font-mono text-muted-foreground tracking-widest">{label}</span>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  <div className={`text-3xl font-black font-mono ${color} leading-none mb-1`}>{value}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{sub}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Recent Findings */}
            <Card className="col-span-2 rounded-none border-border bg-card shadow-none">
              <CardHeader className="px-4 py-3 border-b border-border">
                <CardTitle className="text-[10px] font-mono text-muted-foreground tracking-widest">RECENT FINDINGS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-[11px] font-mono">
                  <thead>
                    <tr className="border-b border-border">
                      {["ID", "TYPE", "SURFACE", "SEV", "SCORE", "STATUS", "AUTHOR"].map(h => (
                        <th key={h} className="text-left text-[9px] text-muted-foreground px-4 py-2 font-normal tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FINDINGS.map((f, i) => (
                      <tr key={f.id} className={`border-b border-border/50 hover:bg-secondary/50 cursor-pointer transition-colors ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                        <td className="px-4 py-2.5 text-muted-foreground">{f.id}</td>
                        <td className="px-4 py-2.5 text-foreground">{f.type}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{f.surface}</td>
                        <td className="px-4 py-2.5"><SevBadge label={f.severity} /></td>
                        <td className={`px-4 py-2.5 font-bold ${f.score >= 8 ? "text-red-400" : f.score >= 5 ? "text-amber-400" : "text-emerald-400"}`}>{f.score}</td>
                        <td className="px-4 py-2.5"><SevBadge label={f.status} /></td>
                        <td className="px-4 py-2.5 text-muted-foreground">{f.author.split("@")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Activity + Surfaces */}
            <div className="flex flex-col gap-3">
              <Card className="rounded-none border-border bg-card shadow-none flex-1">
                <CardHeader className="px-4 py-3 border-b border-border">
                  <CardTitle className="text-[10px] font-mono text-muted-foreground tracking-widest">ACTIVITY LOG</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-2.5 border-b border-border/40 hover:bg-secondary/30">
                      <SevBadge label={a.sev} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono text-foreground leading-tight truncate">{a.text}</p>
                        <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-none border-border bg-card shadow-none">
                <CardHeader className="px-4 py-3 border-b border-border">
                  <CardTitle className="text-[10px] font-mono text-muted-foreground tracking-widest">SURFACE STATUS</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {active.map(c => (
                    <div key={c.id} className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === "SCANNING" ? "bg-blue-400 animate-pulse" : "bg-emerald-500"}`} />
                        <span className="text-[11px] font-mono text-foreground">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-muted-foreground">{c.lastScan}</span>
                        <SevBadge label={c.status} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Blast score bar */}
          <Card className="rounded-none border-border bg-card shadow-none">
            <CardHeader className="px-4 py-3 border-b border-border">
              <CardTitle className="text-[10px] font-mono text-muted-foreground tracking-widest">BLAST RADIUS — TOP FINDINGS</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {FINDINGS.slice(0, 4).map(f => (
                <div key={f.id} className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-muted-foreground w-20 flex-shrink-0">{f.id}</span>
                  <span className="text-[10px] font-mono text-foreground w-40 flex-shrink-0">{f.type}</span>
                  <Progress value={f.score * 10} className="flex-1 h-1.5 rounded-none" />
                  <span className={`text-[11px] font-black font-mono w-8 text-right ${f.score >= 8 ? "text-red-400" : f.score >= 5 ? "text-amber-400" : "text-emerald-400"}`}>{f.score}</span>
                  <span className="text-[10px] font-mono text-red-400 w-16 text-right">{f.cost}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
