"use client"
import { useState } from "react"
import { Nav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SevBadge } from "@/components/severity-badge"
import { CONNECTORS } from "@/lib/data"
import { PlusIcon, RefreshCwIcon, TrashIcon } from "lucide-react"

export default function ConnectorsPage() {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [token, setToken] = useState("")
  const [connected, setConnected] = useState<string[]>([])

  function handleConnect(id: string) {
    if (!token.trim()) return
    setConnected(p => [...p, id])
    setConnecting(null)
    setToken("")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-border px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-foreground">SECRETSENTRY</span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-[10px] font-mono text-foreground">CONNECTORS</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{CONNECTORS.filter(c => c.status !== "DISCONNECTED").length} ACTIVE · {CONNECTORS.filter(c => c.status === "DISCONNECTED").length} AVAILABLE</span>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-3 gap-3">
            {CONNECTORS.map(c => {
              const isConnected = c.status !== "DISCONNECTED" || connected.includes(c.id)
              const isConnecting = connecting === c.id

              return (
                <Card key={c.id} className="rounded-none border-border bg-card shadow-none">
                  <CardHeader className="px-4 py-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-border bg-secondary flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground">
                          {c.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-mono font-bold">{c.name}</CardTitle>
                          <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{c.type.toUpperCase()} CONNECTOR</p>
                        </div>
                      </div>
                      <SevBadge label={connected.includes(c.id) ? "LIVE" : c.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {isConnected ? (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                          <div>
                            <p className="text-muted-foreground text-[9px] tracking-widest">LAST SCAN</p>
                            <p className="text-foreground mt-0.5">
                              {c.status === "SCANNING" ? <span className="text-blue-400 animate-pulse">Scanning now</span> : c.lastScan}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-[9px] tracking-widest">FINDINGS</p>
                            <p className={`mt-0.5 font-bold ${c.findings > 0 ? "text-red-400" : "text-emerald-400"}`}>{c.findings}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 rounded-none border-border text-[10px] font-mono h-7 gap-1.5">
                            <RefreshCwIcon className="w-3 h-3" /> SCAN NOW
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-none text-muted-foreground text-[10px] font-mono h-7 hover:text-red-400">
                            <TrashIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </>
                    ) : isConnecting ? (
                      <div className="space-y-2">
                        <p className="text-[9px] font-mono text-muted-foreground tracking-widest">API TOKEN / WEBHOOK SECRET</p>
                        <Input
                          value={token}
                          onChange={e => setToken(e.target.value)}
                          placeholder={`Paste your ${c.name} token...`}
                          className="rounded-none border-border bg-secondary text-[11px] font-mono h-8 placeholder:text-muted-foreground"
                          type="password"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleConnect(c.id)} disabled={!token.trim()}
                            className="flex-1 rounded-none bg-foreground text-background hover:bg-foreground/90 text-[10px] font-mono h-7">
                            CONNECT
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setConnecting(null)}
                            className="rounded-none text-muted-foreground text-[10px] font-mono h-7">
                            CANCEL
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-[10px] font-mono text-muted-foreground">
                          Connect {c.name} to scan for exposed secrets in real-time. Requires API access.
                        </p>
                        <Button size="sm" onClick={() => setConnecting(c.id)}
                          className="w-full rounded-none bg-secondary border border-border text-foreground hover:bg-secondary/80 text-[10px] font-mono h-7 gap-1.5">
                          <PlusIcon className="w-3 h-3" /> CONNECT {c.name.toUpperCase()}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
