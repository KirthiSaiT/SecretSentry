"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FindingAlertCard, ExtraFindingsCard } from "@/components/finding-card"
import { INITIAL_MESSAGES } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/types"
import { ShieldIcon, ArrowUpIcon, BarChart2Icon, SettingsIcon } from "lucide-react"

function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <Avatar className="w-7 h-7 rounded-md flex-shrink-0 mt-0.5">
        <AvatarFallback className="rounded-md bg-gradient-to-br from-violet-600 to-purple-700">
          <ShieldIcon className="w-3.5 h-3.5 text-white" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1.5 py-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function parseMarkdown(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
}

function AgentMessage({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex gap-3 items-start">
      <Avatar className="w-7 h-7 rounded-md flex-shrink-0 mt-0.5">
        <AvatarFallback className="rounded-md bg-gradient-to-br from-violet-600 to-purple-700">
          <ShieldIcon className="w-3.5 h-3.5 text-white" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold text-muted-foreground">SecretSentry</span>
          <span className="text-[10px] text-muted-foreground/60">{msg.timestamp}</span>
        </div>
        <p
          className="text-sm text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
        />
        {msg.finding && <FindingAlertCard finding={msg.finding} />}
        {msg.extraFindings && msg.extraFindings.length > 0 && (
          <ExtraFindingsCard locations={msg.extraFindings} />
        )}
      </div>
    </div>
  )
}

function UserMessage({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[72%] bg-secondary border border-border rounded-xl rounded-tr-sm px-4 py-2.5">
        <p className="text-sm text-foreground leading-relaxed">{msg.content}</p>
      </div>
    </div>
  )
}

const QUICK_PROMPTS = [
  "Show all critical findings",
  "Which dev keeps leaking secrets?",
  "Scan GitHub now",
  "Any dark web exposure?",
]

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  function sendMessage(text?: string) {
    const content = text ?? input.trim()
    if (!content) return
    setInput("")

    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const reply: ChatMessage = {
        id: `m${Date.now() + 1}`,
        role: "agent",
        content: getReply(content),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, reply])
    }, 1800)
  }

  function getReply(q: string): string {
    const lower = q.toLowerCase()
    if (lower.includes("critical")) return "You have 3 critical findings right now. The highest priority is the AWS IAM key exposed in Slack with a blast score of 9.2/10 and estimated breach cost of $2.3M. The Stripe live key in GitHub is second at 8.7/10. Both keys are still active — I strongly recommend rotating them immediately."
    if (lower.includes("dev") || lower.includes("leak")) return "john@acme.com is your highest-risk developer with 8 findings — including the active AWS key. They're a repeat offender. priya@acme.com has 5 findings including the Stripe key in GitHub. I can generate a risk report to share with your security team."
    if (lower.includes("scan") || lower.includes("github")) return "Starting a full GitHub scan now across all connected repositories. I'll check commit history, open PRs, issues, and wiki pages. This typically takes 2–5 minutes. I'll alert you here as soon as anything is found."
    if (lower.includes("dark web")) return "Good news — none of your detected secrets have appeared in known dark web breach dumps so far. I check against HIBP and IntelX databases every 6 hours. The AWS IAM key and Stripe key are the most likely candidates to surface if they remain unrotated."
    return "I'm continuously scanning your connected surfaces. You currently have 3 critical findings, 47 total secrets detected, and 39 have been remediated. What would you like to investigate?"
  }

  return (
    <div className="flex-1 flex flex-col bg-background min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-violet-600 to-purple-700">
              <ShieldIcon className="w-4 h-4 text-white" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">SecretSentry Agent</div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Watching 3 surfaces · scanning now
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
            <SettingsIcon className="w-3 h-3" /> Settings
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
            <BarChart2Icon className="w-3 h-3" /> Reports
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-6" ref={scrollRef as any}>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {messages.map((msg, i) => (
            <div key={msg.id}>
              {i > 0 && msg.role === "agent" && messages[i - 1].role === "agent" && (
                <Separator className="mb-6" />
              )}
              {msg.role === "agent" ? <AgentMessage msg={msg} /> : <UserMessage msg={msg} />}
            </div>
          ))}
          {typing && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Quick prompts */}
      <div className="px-6 pb-2 flex gap-2 flex-wrap max-w-3xl mx-auto w-full">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => sendMessage(p)}
            className="text-[11px] text-muted-foreground border border-border rounded-full px-3 py-1 hover:bg-secondary hover:text-foreground transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-card border border-border rounded-xl px-4 py-3 focus-within:border-muted-foreground transition-colors">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask SecretSentry — 'show all critical findings', 'which dev keeps leaking?', 'scan GitHub now'..."
              className="flex-1 bg-transparent border-0 shadow-none resize-none text-sm p-0 min-h-[24px] max-h-[120px] focus-visible:ring-0 placeholder:text-muted-foreground"
              rows={1}
            />
            <Button
              size="icon"
              className="w-8 h-8 rounded-lg bg-foreground text-background hover:bg-foreground/90 flex-shrink-0"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
            >
              <ArrowUpIcon className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            SecretSentry watches your surfaces 24/7 and alerts you here in real time
          </p>
        </div>
      </div>
    </div>
  )
}
