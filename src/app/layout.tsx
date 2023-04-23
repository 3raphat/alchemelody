import "~/styles/globals.css"
import { Lora as FontSerif } from "next/font/google"
import Providers from "~/components/providers"
import { SEO } from "~/config/seo"
import { cn } from "~/lib/utils"

const serif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  ...SEO,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col font-serif antialiased",
          serif.variable
        )}
      >
        <Providers>
          <div className="flex-1">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
