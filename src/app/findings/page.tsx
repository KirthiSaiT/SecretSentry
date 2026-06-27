"use client"
import { useState } from "react"
import { Nav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SevBadge } from "@/components/severity-badge"
import { FINDINGS } from "@/lib/data"
import { SearchIcon, RotateCcwIcon, XCircleIcon, FileTextIcon } from "lucide-react"

type Finding = typeof FINDINGS[0]

export default function FindingsPage() {
  const [search, setSearch] = useState("")
  const [sev, setSev] = useState("ALL")
  const [selected, setSelected] = useState<Finding | null>(null)

  const filtered = FINDINGS.filter(f => {
    const matchSearch = f.type.includes(search.toUpperCase()) || f.author.includes(search) || f.surface.includes(search.toUpperCase())
    const matchSev = sev === "ALL" || f.severity === sev
    return matchSearch && matchSev
  })

  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground">SECRETSENTRY</span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-[10px] font-mono text-foreground">FINDINGS</span>
            <span className="text-[10px] font-mono text-muted-foreground">({FINDINGS.length} total)</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-border px-4 py-2.5 flex items-center gap-3 flex-shrink-0">
              <div className="relative flex-1 max-w-xs">
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search findings..."
                  className="pl-8 h-7 text-[11px] font-mono rounded-none border-border bg-card placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-1">
                {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map(s => (
                  <button key={s} onClick={() => setSev(s)}
                    className={`text-[9px] font-mono px-2.5 py-1 border transition-colors ${
                      sev === s ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground ml-auto">{filtered.length} results</span>
            </div>

            <ScrollArea className="flex-1">
              <table className="w-full text-[11px] font-mono">
                <thead className="sticky top-0 bg-card border-b border-border z-10">
                  <tr>
                    {["ID", "SECRET TYPE", "SURFACE", "SEVERITY", "SCORE", "STATUS", "EXPOSED BY", "FOUND AT", "LOCATIONS", "EST. COST"].map(h => (
                      <th key={h} className="text-left text-[9px] text-muted-foreground px-4 py-2.5 font-normal tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f, i) => (
                    <tr
                      key={f.id}
                      onClick={() => setSelected(f)}
                      className={`border-b border-border/40 cursor-pointer transition-colors
                        ${selected?.id === f.id ? "bg-secondary/80" : i % 2 === 0 ? "hover:bg-secondary/40" : "bg-secondary/20 hover:bg-secondary/50"}`}
                    >
                      <td className="px-4 py-2.5 text-muted-foreground">{f.id}</td>
                      <td className="px-4 py-2.5 text-foreground font-bold">{f.type}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{f.surface}</td>
                      <td className="px-4 py-2.5"><SevBadge label={f.severity} /></td>
                      <td className={`px-4 py-2.5 font-black ${f.score >= 8 ? "text-red-400" : f.score >= 5 ? "text-amber-400" : "text-emerald-400"}`}>{f.score}</td>
                      <td className="px-4 py-2.5"><SevBadge label={f.status} /></td>
                      <td className="px-4 py-2.5 text-muted-foreground">{f.author}</td>
                      <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{f.found}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{f.locations}</td>
                      <td className={`px-4 py-2.5 font-bold ${f.severity === "CRITICAL" ? "text-red-400" : "text-muted-foreground"}`}>{f.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-72 border-l border-border flex flex-col overflow-hidden">
              <div className="border-b border-border px-4 py-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-muted-foreground tracking-widest">FINDING DETAIL</span>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <XCircleIcon className="w-3.5 h-3.5" />
                </button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4 font-mono text-[11px]">
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">FINDING ID</p>
                    <p className="text-foreground font-bold">{selected.id}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">SECRET TYPE</p>
                    <p className="text-foreground font-bold">{selected.type}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-widest mb-1">SEVERITY</p>
                      <SevBadge label={selected.severity} />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-widest mb-1">STATUS</p>
                      <SevBadge label={selected.status} />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-widest mb-1">BLAST SCORE</p>
                      <p className={`font-black text-base ${selected.score >= 8 ? "text-red-400" : selected.score >= 5 ? "text-amber-400" : "text-emerald-400"}`}>
                        {selected.score}<span className="text-muted-foreground text-[10px]">/10</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground tracking-widest mb-1">EST. COST</p>
                      <p className="text-red-400 font-bold">{selected.cost}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">EXPOSED BY</p>
                    <p className="text-foreground">{selected.author}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">SURFACE</p>
                    <p className="text-foreground">{selected.surface}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">FIRST SEEN</p>
                    <p className="text-foreground">{selected.found}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground tracking-widest mb-1">EXPOSURE LOCATIONS</p>
                    <p className="text-foreground">{selected.locations} surface{selected.locations > 1 ? "s" : ""}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-[9px] text-muted-foreground tracking-widest">ACTIONS</p>
                    <Button size="sm" className="w-full rounded-none bg-red-500 hover:bg-red-600 text-white text-[10px] font-mono h-7 justify-start gap-2">
                      <RotateCcwIcon className="w-3 h-3" /> ROTATE KEY NOW
                    </Button>
                    <Button size="sm" variant="outline" className="w-full rounded-none border-border text-[10px] font-mono h-7 justify-start gap-2">
                      <FileTextIcon className="w-3 h-3" /> VIEW FULL REPORT
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full rounded-none text-muted-foreground text-[10px] font-mono h-7 justify-start gap-2">
                      <XCircleIcon className="w-3 h-3" /> MARK FALSE POSITIVE
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
