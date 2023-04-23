"use client"

import React from "react"
import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { SpotifyProvider } from "~/context/spotify-context"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider defaultTheme="dark">
          <SpotifyProvider>{children}</SpotifyProvider>
        </ThemeProvider>
      </SessionProvider>
      <Analytics />
    </>
  )
}
