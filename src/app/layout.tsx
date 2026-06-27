import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata: Metadata = {
  title: "SecretSentry — Threat Intelligence Platform",
  description: "AI-powered secrets detection across all your surfaces",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className="h-screen overflow-hidden bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
