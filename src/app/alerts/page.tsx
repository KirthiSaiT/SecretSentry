import { Nav } from "@/components/nav"
export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Nav />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[11px] font-mono text-muted-foreground">COMING SOON</p>
      </div>
    </div>
  )
}
