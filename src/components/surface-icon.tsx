"use client"
import type { SurfaceType } from "@/lib/types"

const icons: Record<SurfaceType, { emoji: string; color: string }> = {
  github: { emoji: "⬡", color: "text-foreground" },
  slack: { emoji: "◈", color: "text-emerald-400" },
  notion: { emoji: "◻", color: "text-violet-400" },
  docker: { emoji: "◆", color: "text-blue-400" },
  s3: { emoji: "◈", color: "text-amber-400" },
  jira: { emoji: "◇", color: "text-blue-500" },
}

const labels: Record<SurfaceType, string> = {
  github: "GitHub",
  slack: "Slack",
  notion: "Notion",
  docker: "Docker",
  s3: "Amazon S3",
  jira: "Jira",
}

export function SurfaceIcon({ type, size = 14 }: { type: SurfaceType; size?: number }) {
  const icon = icons[type]
  return (
    <span className={`font-bold ${icon.color}`} style={{ fontSize: size }}>
      {icon.emoji}
    </span>
  )
}

export function surfaceLabel(type: SurfaceType) {
  return labels[type]
}
