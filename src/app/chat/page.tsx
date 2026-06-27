"use client"
import { useState, useRef, useEffect } from "react"
import { Nav } from "@/components/nav"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SevBadge } from "@/components/severity-badge"
import { CHAT_HISTORY, ACTIVITY, FINDINGS } from "@/lib/data"
import { ArrowUpIcon, ShieldIcon } from "lucide-react"

type Msg = { id: string; role: "agent" | "user"; content: string; ts: string; severity?: "critical" | "high" }

const SUGGESTIONS = [
  "Show all critical findings",
  "Which developer has most leaks?",
  "Scan GitHub now",
  "Check dark web exposure",
  "Show blast radius for F-001",
  "List all active secrets",
]

function AgentMsg({ msg }: { msg: Msg }) {
  return (
    <div className="flex gap-3 group">
      <div className="w-6 h-6 rounded border border-border bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
        <ShieldIcon className="w-3 h-3 text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-mono text-muted-foreground">SECRETSENTRY AGENT</span>
          <span className="text-[9px] font-mono text-muted-foreground/50">{msg.ts}</span>
          {msg.severity && <SevBadge label={msg.severity.toUpperCase()} />}
        </div>
        <div className="text-[12px] font-mono text-foreground leading-relaxed whitespace-pre-wrap border-l-2 border-border pl-3">
          {msg.content}
        </div>
      </div>
    </div>
  )
}

function UserMsg({ msg }: { msg: Msg }) {
  return (
    <div className="flex justify-end gap-3">
      <div className="max-w-[70%]">
        <div className="text-[9px] font-mono text-muted-foreground text-right mb-1">{msg.ts}</div>
        <div className="bg-secondary border border-border text-[12px] font-mono text-foreground px-4 py-2.5 leading-relaxed">
          {msg.content}
        </div>
      </div>
    </div>
  )
}

function getReply(q: string): string {
  const l = q.toLowerCase()
  if (l.includes("critical")) return `QUERY: critical findings\nRESULT: 3 findings match severity=CRITICAL\n\n  [F-001] AWS_IAM_KEY      · SLACK   · score=9.2 · ACTIVE  · $2.3M\n  [F-002] STRIPE_LIVE_KEY  · GITHUB  · score=8.7 · ACTIVE  · $980K\n\nBoth keys are still active. Immediate rotation required.`
  if (l.includes("dev") || l.includes("leak")) return `QUERY: developer risk ranking\nRESULT: 5 developers scanned\n\n  RANK 1  john@acme.com   · 8 findings · 2 critical · risk=9.1\n  RANK 2  priya@acme.com  · 5 findings · 1 critical · risk=7.4\n  RANK 3  ops@acme.com    · 3 findings · 0 critical · risk=2.9\n\njohn@acme.com is a repeat offender. Recommend security training.`
  if (l.includes("scan") || l.includes("github")) return `ACTION: initiating GitHub scan\nSTATUS: scanning...\n\nScanning: commits (main, develop, staging)\nScanning: open pull requests (12)\nScanning: issues and comments\nScanning: wiki pages\n\nEstimated completion: 2-4 minutes. Will alert on any findings.`
  if (l.includes("dark web") || l.includes("dark")) return `QUERY: dark web exposure check\nSOURCE: HIBP + IntelX databases\nRESULT: 0 matches found\n\nNone of your 47 detected secrets appear in known breach databases. Last checked: ${new Date().toISOString().slice(0, 19)} UTC\n\nNote: AWS_IAM_KEY (F-001) and STRIPE_LIVE_KEY (F-002) are high risk if not rotated.`
  if (l.includes("blast") || l.includes("f-001")) return `QUERY: blast radius — F-001 AWS_IAM_KEY\n\n  SCORE:     9.2 / 10\n  STATUS:    ACTIVE (validated 4 min ago)\n  COST EST:  $2,300,000\n\n  RESOURCES:\n  ├─ S3 buckets:    47 accessible\n  ├─ EC2 instances: 12 accessible  \n  ├─ RDS databases: 3 accessible\n  └─ IAM policies:  admin-level\n\n  DARK WEB:  0 hits (clean)\n  LOCATIONS: 3 surfaces (slack, github, notion)`
  if (l.includes("active") || l.includes("list")) return `QUERY: active secrets\nRESULT: 2 secrets currently active\n\n  [F-001] AWS_IAM_KEY      · last validated 4 min ago\n  [F-002] STRIPE_LIVE_KEY  · last validated 2h ago\n\n39 secrets have been remediated. 6 are under review.`
  return `QUERY: "${q}"\nSTATUS: processing...\n\nCurrently monitoring:\n  · 3 surfaces (GitHub, Slack, Notion)\n  · 47 total findings detected\n  · 3 critical findings require attention\n  · Next full scan: 2h 14m\n\nAsk me to show findings, scan surfaces, check blast radius, or analyze developer risk.`
}

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>(CHAT_HISTORY as Msg[])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs, typing])

  function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content) return
    setInput("")
    const ts = new Date().toTimeString().slice(0, 8)
    setMsgs(p => [...p, { id: `u${Date.now()}`, role: "user", content, ts }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(p => [...p, { id: `a${Date.now()}`, role: "agent", content: getReply(content), ts: new Date().toTimeString().slice(0, 8) }])
    }, 1200)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex overflow-hidden">
        {/* Chat main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-muted-foreground">SECRETSENTRY</span>
              <span className="text-[10px] text-muted-foreground">/</span>
              <span className="text-[10px] font-mono text-foreground">AI AGENT</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              WATCHING 3 SURFACES · REAL-TIME
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {msgs.map(m => m.role === "agent" ? <AgentMsg key={m.id} msg={m} /> : <UserMsg key={m.id} msg={m} />)}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded border border-border bg-secondary flex items-center justify-center flex-shrink-0">
                    <ShieldIcon className="w-3 h-3 text-foreground" />
                  </div>
                  <div className="text-[12px] font-mono text-muted-foreground border-l-2 border-border pl-3 flex items-center gap-1">
                    <span>processing</span>
                    <span className="cursor-blink">_</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Suggestions */}
          <div className="px-6 pb-2">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="text-[10px] font-mono text-muted-foreground border border-border px-2.5 py-1 hover:bg-secondary hover:text-foreground transition-colors rounded-none">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border px-6 py-4 flex-shrink-0">
            <div className="max-w-3xl mx-auto flex gap-3">
              <div className="flex-1 relative bg-card border border-border">
                <Textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder="Query the agent — 'show critical findings', 'scan GitHub', 'blast radius F-001'..."
                  className="bg-transparent border-0 shadow-none resize-none text-[12px] font-mono placeholder:text-muted-foreground focus-visible:ring-0 rounded-none min-h-[42px]"
                  rows={1}
                />
              </div>
              <Button onClick={() => send()} disabled={!input.trim() && !typing}
                className="rounded-none bg-foreground text-background hover:bg-foreground/90 h-auto px-4 font-mono text-[11px]">
                <ArrowUpIcon className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[9px] font-mono text-muted-foreground text-center mt-2 max-w-3xl mx-auto">
              ENTER to send · SHIFT+ENTER for new line · Agent monitors all surfaces 24/7
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-56 border-l border-border flex flex-col overflow-hidden">
          <div className="border-b border-border px-3 py-3">
            <p className="text-[9px] font-mono text-muted-foreground tracking-widest">LIVE INTEL</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="border-b border-border p-3 space-y-2">
              <p className="text-[9px] font-mono text-muted-foreground tracking-widest mb-2">CRITICAL</p>
              {FINDINGS.filter(f => f.severity === "CRITICAL").map(f => (
                <div key={f.id} className="border border-red-500/20 bg-red-500/5 p-2 text-[10px] font-mono">
                  <div className="text-red-400 font-bold">{f.type}</div>
                  <div className="text-muted-foreground">{f.surface} · score {f.score}</div>
                  <div className="text-red-400">{f.cost} at risk</div>
                </div>
              ))}
            </div>
            <div className="p-3 space-y-1">
              <p className="text-[9px] font-mono text-muted-foreground tracking-widest mb-2">RECENT EVENTS</p>
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-1.5 py-1.5 border-b border-border/30">
                  <SevBadge label={a.sev} />
                  <div>
                    <p className="text-[9px] font-mono text-foreground leading-tight">{a.text}</p>
                    <p className="text-[9px] font-mono text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
