import { Badge } from "@/components/ui/badge"

const cfg = {
  CRITICAL: "bg-red-500/10 text-red-400 border-red-500/30 font-mono",
  HIGH:     "bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono",
  MEDIUM:   "bg-blue-500/10 text-blue-400 border-blue-500/30 font-mono",
  LOW:      "bg-zinc-500/10 text-zinc-400 border-zinc-500/30 font-mono",
  ACTIVE:   "bg-red-500/10 text-red-400 border-red-500/30 font-mono",
  CHECKING: "bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono",
  ROTATED:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono",
  LIVE:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono",
  SCANNING: "bg-blue-500/10 text-blue-400 border-blue-500/30 font-mono",
  DISCONNECTED: "bg-zinc-500/10 text-zinc-500 border-zinc-700/30 font-mono",
  OK:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono",
  INFO: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30 font-mono",
}

export function SevBadge({ label }: { label: string }) {
  const cls = cfg[label as keyof typeof cfg] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/30 font-mono"
  return (
    <Badge className={`text-[10px] py-0 px-1.5 rounded-none border ${cls} hover:${cls}`}>
      {label}
    </Badge>
  )
}
