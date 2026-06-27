export type Severity = "critical" | "high" | "medium" | "low"
export type Status = "active" | "checking" | "rotated" | "false_positive"
export type SurfaceType = "github" | "slack" | "notion" | "docker" | "s3" | "jira"

export interface Surface {
  id: string
  name: string
  type: SurfaceType
  connected: boolean
  lastScan?: string
  scanFrequency?: string
}

export interface Finding {
  id: string
  secretType: string
  surface: SurfaceType
  severity: Severity
  blastScore: number
  status: Status
  exposedBy: string
  foundAt: string
  estimatedCost?: string
  s3Buckets?: number
  ec2Instances?: number
  darkWebHits?: number
  locations?: ExposureLocation[]
}

export interface ExposureLocation {
  surface: SurfaceType
  url: string
  description: string
  foundAt: string
}

export interface ChatMessage {
  id: string
  role: "agent" | "user"
  content: string
  timestamp: string
  finding?: Finding
  extraFindings?: ExposureLocation[]
}

export interface Stats {
  critical: number
  total: number
  avgBlastScore: number
  remediated: number
}

export interface ActivityItem {
  id: string
  text: string
  severity: "critical" | "high" | "medium" | "success"
  time: string
}
