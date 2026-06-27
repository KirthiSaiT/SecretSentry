import { LeftSidebar } from "@/components/left-sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { RightPanel } from "@/components/right-panel"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <LeftSidebar />
      <ChatPanel />
      <RightPanel />
    </div>
  )
}
