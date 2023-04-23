export const siteConfig = {
  name: "Alchemelody",
  description:
    "Discover your new favorite tunes with Alchemelody — a curated Spotify playlist website that offers a diverse range of music genres and moods to suit every occasion.",
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/api/og`,
}

export type SiteConfig = typeof siteConfig
