"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderText,
} from "~/components/page-header"
import { Button } from "~/components/ui/button"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const handleClick = async () => {
    if (session) {
      return router.push("/alchemy")
    }
    await signIn("spotify", { callbackUrl: "/alchemy" })
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div>
          <PageHeader>
            <PageHeaderHeading>Alchemelody</PageHeaderHeading>
            <PageHeaderText className="text-primary-lighter">
              /ˌælkəˈmɛlədi/
            </PageHeaderText>
            <PageHeaderDescription>
              Discover your new favorite tunes with Alchemelody — a curated
              Spotify playlist website that offers a diverse range of music
              genres and moods to suit every occasion.
            </PageHeaderDescription>
          </PageHeader>
          <Button variant="solid-hover-outline" size="lg" onClick={handleClick}>
            Let&apos;s alchemy
          </Button>
        </div>

        <div className="relative aspect-square w-full max-w-xl lg:max-w-2xl">
          <Image
            src="/images/alchemy_transparent.png"
            alt=""
            priority
            quality={100}
            style={{ objectFit: "contain" }}
            fill
          />
        </div>
      </div>
    </div>
  )
}
