"use client"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SevBadge } from "@/components/severity-badge"
import { DEVELOPERS, FINDINGS } from "@/lib/data"

export default function DevelopersPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground">SECRETSENTRY</span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-[10px] font-mono text-foreground">DEVELOPER RISK</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-3">
          <Card className="rounded-none border-border bg-card shadow-none">
            <CardHeader className="px-4 py-3 border-b border-border">
              <CardTitle className="text-[10px] font-mono text-muted-foreground tracking-widest">RISK LEADERBOARD</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-[11px] font-mono">
                <thead>
                  <tr className="border-b border-border">
                    {["RANK", "DEVELOPER", "FINDINGS", "CRITICAL", "RISK SCORE", "RISK BAR", "TREND"].map(h => (
                      <th key={h} className="text-left text-[9px] text-muted-foreground px-4 py-2.5 font-normal tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEVELOPERS.sort((a, b) => b.score - a.score).map((d, i) => (
                    <tr key={d.email} className="border-b border-border/40 hover:bg-secondary/40">
                      <td className="px-4 py-3 text-muted-foreground">#{i + 1}</td>
                      <td className="px-4 py-3 text-foreground font-bold">{d.email}</td>
                      <td className="px-4 py-3 text-foreground">{d.findings}</td>
                      <td className="px-4 py-3">
                        {d.critical > 0
                          ? <SevBadge label="CRITICAL" />
                          : <span className="text-muted-foreground">0</span>}
                      </td>
                      <td className={`px-4 py-3 font-black text-base ${d.score >= 7 ? "text-red-400" : d.score >= 4 ? "text-amber-400" : "text-emerald-400"}`}>
                        {d.score}
                      </td>
                      <td className="px-4 py-3 w-32">
                        <Progress value={d.score * 10} className="h-1.5 rounded-none" />
                      </td>
                      <td className="px-4 py-3">
                        <span className={d.trend === "up" ? "text-red-400" : d.trend === "down" ? "text-emerald-400" : "text-muted-foreground"}>
                          {d.trend === "up" ? "▲ INCREASING" : d.trend === "down" ? "▼ DECREASING" : "● STABLE"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {DEVELOPERS.slice(0, 2).map(d => (
              <Card key={d.email} className="rounded-none border-border bg-card shadow-none">
                <CardHeader className="px-4 py-3 border-b border-border">
                  <CardTitle className="text-[11px] font-mono text-foreground">{d.email}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {FINDINGS.filter(f => f.author === d.email).map(f => (
                      <div key={f.id} className="flex items-center gap-3 text-[10px] font-mono border border-border/40 p-2 hover:bg-secondary/30">
                        <SevBadge label={f.severity} />
                        <span className="text-foreground flex-1">{f.type}</span>
                        <span className="text-muted-foreground">{f.surface}</span>
                        <SevBadge label={f.status} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
