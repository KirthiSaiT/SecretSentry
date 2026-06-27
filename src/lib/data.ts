export const FINDINGS = [
  { id: "F-001", type: "AWS_IAM_KEY", surface: "SLACK", severity: "CRITICAL", score: 9.2, status: "ACTIVE", author: "john@acme.com", cost: "$2.3M", found: "2026-06-12 08:22", locations: 3 },
  { id: "F-002", type: "STRIPE_LIVE_KEY", surface: "GITHUB", severity: "CRITICAL", score: 8.7, status: "ACTIVE", author: "priya@acme.com", cost: "$980K", found: "2026-06-14 14:07", locations: 1 },
  { id: "F-003", type: "GITHUB_PAT", surface: "NOTION", severity: "HIGH", score: 6.1, status: "CHECKING", author: "dev@acme.com", cost: "$120K", found: "2026-06-19 09:31", locations: 2 },
  { id: "F-004", type: "POSTGRES_URL", surface: "GITHUB", severity: "MEDIUM", score: 4.3, status: "ROTATED", author: "ops@acme.com", cost: "$45K", found: "2026-06-20 11:00", locations: 1 },
  { id: "F-005", type: "SLACK_BOT_TOKEN", surface: "GITHUB", severity: "MEDIUM", score: 3.8, status: "ROTATED", author: "john@acme.com", cost: "$22K", found: "2026-06-21 15:44", locations: 1 },
  { id: "F-006", type: "TWILIO_API_KEY", surface: "GITHUB", severity: "LOW", score: 2.1, status: "ROTATED", author: "mia@acme.com", cost: "$8K", found: "2026-06-22 10:30", locations: 1 },
]

export const CONNECTORS = [
  { id: "C-001", name: "GitHub", type: "github", status: "LIVE", lastScan: "4 min ago", findings: 18, icon: "GH" },
  { id: "C-002", name: "Slack", type: "slack", status: "SCANNING", lastScan: "Now", findings: 22, icon: "SL" },
  { id: "C-003", name: "Notion", type: "notion", status: "LIVE", lastScan: "12 min ago", findings: 7, icon: "NT" },
  { id: "C-004", name: "Docker Hub", type: "docker", status: "DISCONNECTED", lastScan: "—", findings: 0, icon: "DK" },
  { id: "C-005", name: "Amazon S3", type: "s3", status: "DISCONNECTED", lastScan: "—", findings: 0, icon: "S3" },
  { id: "C-006", name: "Jira", type: "jira", status: "DISCONNECTED", lastScan: "—", findings: 0, icon: "JR" },
]

export const DEVELOPERS = [
  { email: "john@acme.com", findings: 8, critical: 2, score: 9.1, trend: "up" },
  { email: "priya@acme.com", findings: 5, critical: 1, score: 7.4, trend: "up" },
  { email: "dev@acme.com", findings: 2, critical: 0, score: 3.2, trend: "down" },
  { email: "mia@acme.com", findings: 1, critical: 0, score: 1.8, trend: "stable" },
  { email: "ops@acme.com", findings: 3, critical: 0, score: 2.9, trend: "down" },
]

export const CHAT_HISTORY = [
  {
    id: "m1", role: "agent" as const,
    content: "ALERT DETECTED — AWS_IAM_KEY exposed in Slack #engineering by john@acme.com. Key validated: STILL ACTIVE. Blast score: 9.2/10. Estimated breach cost: $2.3M. Access confirmed to 47 S3 buckets, 12 EC2 instances, 3 RDS databases.",
    ts: "10:14:03",
    severity: "critical" as const,
  },
  {
    id: "m2", role: "user" as const,
    content: "Is the same key anywhere else? Check GitHub and Notion.",
    ts: "10:14:31",
  },
  {
    id: "m3", role: "agent" as const,
    content: "Cross-surface scan complete. Same key found in 2 additional locations:\n\n[1] GITHUB — commit a3f9c1 on main branch (priya@acme.com, Jun 14 14:07). File: config/deploy.py:23. Commit is public.\n\n[2] NOTION — page 'Deploy notes' (workspace-wide access, 47 employees). Last edited Jun 19.\n\nTotal exposure surface: 3 locations across 3 platforms. Recommend immediate key rotation and CloudTrail audit from Jun 12.",
    ts: "10:14:33",
    severity: "high" as const,
  },
]

export const ACTIVITY = [
  { text: "AWS_IAM_KEY detected in slack/#engineering", sev: "CRITICAL", time: "4m ago" },
  { text: "STRIPE_LIVE_KEY found in github/commit a3f9c1", sev: "CRITICAL", time: "2h ago" },
  { text: "GITHUB_PAT found in notion/deploy-notes", sev: "HIGH", time: "1d ago" },
  { text: "POSTGRES_URL rotated by ops@acme.com", sev: "OK", time: "2d ago" },
  { text: "SLACK_BOT_TOKEN remediated", sev: "OK", time: "3d ago" },
  { text: "Full scan completed — 3 surfaces", sev: "INFO", time: "4d ago" },
]
