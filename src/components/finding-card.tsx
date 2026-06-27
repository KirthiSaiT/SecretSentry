"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Finding, ExposureLocation } from "@/lib/types"
import { AlertCircleIcon, RotateCcwIcon, FileTextIcon, XCircleIcon } from "lucide-react"

const severityConfig = {
  critical: { label: "CRITICAL", className: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/10" },
  high: { label: "HIGH", className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10" },
  medium: { label: "MEDIUM", className: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10" },
  low: { label: "LOW", className: "bg-muted text-muted-foreground hover:bg-muted" },
}

function MetaCell({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="bg-background rounded-md border border-border p-2.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{label}</div>
      <div className={`text-sm font-bold font-mono ${valueClass ?? "text-foreground"}`}>{value}</div>
    </div>
  )
}

export function FindingAlertCard({ finding }: { finding: Finding }) {
  const sev = severityConfig[finding.severity]

  return (
    <Card className="mt-3 border border-red-500/20 bg-red-500/5 shadow-none">
      <CardHeader className="px-4 py-3 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="w-4 h-4 text-red-400" />
            <Badge className={`text-[10px] font-bold py-0.5 ${sev.className}`}>{sev.label}</Badge>
            <span className="text-sm font-semibold text-red-400">{finding.secretType} — Still Active</span>
          </div>
          <span className="text-xs text-red-400 font-bold">Blast score {finding.blastScore}/10</span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-3 pb-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <MetaCell label="Found in" value={finding.surface === "slack" ? "#engineering" : finding.surface} />
          <MetaCell label="Exposed by" value={finding.exposedBy} />
          <MetaCell label="Est. breach cost" value={finding.estimatedCost ?? "—"} valueClass="text-red-400" />
          <MetaCell label="S3 buckets" value={`${finding.s3Buckets ?? 0} at risk`} />
          <MetaCell label="EC2 instances" value={`${finding.ec2Instances ?? 0} at risk`} />
          <MetaCell label="Dark web hits" value={`${finding.darkWebHits ?? 0} (clean)`} valueClass="text-emerald-400" />
        </div>
        <Separator className="mb-3" />
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold h-7">
            <RotateCcwIcon className="w-3 h-3 mr-1" /> Rotate key now
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-7">
            <FileTextIcon className="w-3 h-3 mr-1" /> View full report
          </Button>
          <Button size="sm" variant="ghost" className="text-xs h-7 text-muted-foreground">
            <XCircleIcon className="w-3 h-3 mr-1" /> Mark false positive
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ExtraFindingsCard({ locations }: { locations: ExposureLocation[] }) {
  return (
    <div className="mt-2 flex flex-col gap-1.5">
      {locations.map((loc, i) => (
        <Card key={i} className="border border-amber-500/20 bg-amber-500/5 shadow-none">
          <CardContent className="px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="text-[10px] font-bold py-0.5 bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10">
                HIGH
              </Badge>
              <span className="text-xs font-semibold text-amber-400">{loc.description}</span>
            </div>
            <p className="text-xs text-muted-foreground">Found {loc.foundAt} · Accessible to all workspace members.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
