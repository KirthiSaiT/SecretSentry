import type { Surface, Finding, ChatMessage, Stats, ActivityItem } from "./types"

export const SURFACES: Surface[] = [
  { id: "1", name: "GitHub", type: "github", connected: true, lastScan: "4 min ago", scanFrequency: "real-time" },
  { id: "2", name: "Slack", type: "slack", connected: true, lastScan: "Scanning now", scanFrequency: "real-time" },
  { id: "3", name: "Notion", type: "notion", connected: true, lastScan: "12 min ago", scanFrequency: "every 15m" },
  { id: "4", name: "Docker", type: "docker", connected: false },
  { id: "5", name: "S3", type: "s3", connected: false },
  { id: "6", name: "Jira", type: "jira", connected: false },
]

export const MOCK_FINDING: Finding = {
  id: "f1",
  secretType: "AWS_IAM_KEY",
  surface: "slack",
  severity: "critical",
  blastScore: 9.2,
  status: "active",
  exposedBy: "john@acme.com",
  foundAt: "Today, 10:14 AM",
  estimatedCost: "$2.3M",
  s3Buckets: 47,
  ec2Instances: 12,
  darkWebHits: 0,
  locations: [
    { surface: "slack", url: "#engineering", description: "Slack #engineering", foundAt: "Jun 12, 2026 · 08:22" },
    { surface: "github", url: "commit/a3f9c1", description: "GitHub commit a3f9c1 · main branch", foundAt: "Jun 14, 2026 · 14:07" },
    { surface: "notion", url: "Deploy notes", description: "Notion page 'Deploy notes'", foundAt: "Jun 19, 2026 · 09:31" },
  ],
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "agent",
    content: "I found a critical secret exposure while scanning your Slack workspace. An AWS IAM key was shared in **#engineering** by john@acme.com. I validated it — the key is still active and has access to 47 S3 buckets.",
    timestamp: "Today, 10:14 AM",
    finding: MOCK_FINDING,
  },
  {
    id: "m2",
    role: "user",
    content: "Is the same key anywhere else? Check GitHub and Notion too.",
    timestamp: "10:14 AM",
  },
  {
    id: "m3",
    role: "agent",
    content: "Yes — I found the same key in 2 more places. It has spread across 3 surfaces total. I recommend rotating the key immediately, then auditing CloudTrail logs from Jun 12 onwards to check for unauthorized access.",
    timestamp: "10:14 AM",
    extraFindings: MOCK_FINDING.locations?.slice(1),
  },
]

export const STATS: Stats = {
  critical: 3,
  total: 47,
  avgBlastScore: 6.4,
  remediated: 39,
}

export const ACTIVITY: ActivityItem[] = [
  { id: "a1", text: "AWS key found in Slack #engineering", severity: "critical", time: "4 min ago" },
  { id: "a2", text: "Stripe key in GitHub commit a3f9c1", severity: "high", time: "2 hrs ago" },
  { id: "a3", text: "PAT found in Notion 'Deploy notes'", severity: "high", time: "Yesterday" },
  { id: "a4", text: "POSTGRES_URL rotated by ops@acme", severity: "success", time: "2 days ago" },
  { id: "a5", text: "Slack token remediated", severity: "success", time: "3 days ago" },
]
