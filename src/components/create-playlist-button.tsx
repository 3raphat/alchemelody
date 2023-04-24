import React from "react"
import { useSession } from "next-auth/react"
import { Button, ButtonProps, buttonVariants } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { SpotifyContext } from "~/context/spotify-context"
import { cn, convertImageToBase64 } from "~/lib/utils"

export default function CreatePlaylistButton({
  className,
  ...props
}: ButtonProps) {
  const { recommendations } = React.useContext(SpotifyContext)
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [playlistUrl, setPlaylistUrl] = React.useState("")
  const [image, setImage] = React.useState("")

  React.useEffect(() => {
    convertImageToBase64("/images/alchemy.jpeg", setImage)
  }, [playlistUrl])

  const handleClick = async () => {
    setLoading(true)
    fetch(`/api/create-playlist?user_id=${session?.user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Alchemelody",
        description:
          "Unleash the Magic of Music with Alchemelody - Your Ultimate Source for Curated Spotify Playlists",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylistUrl(data.external_urls.spotify)
        fetch(`/api/add-to-playlist?playlist_id=${data.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: recommendations.map((track: any) => track.uri),
          }),
        }).then(() => {
          fetch(`/api/add-playlist-cover?playlist_id=${data.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: image.replace("data:image/png;base64,", ""),
            }),
          }).then(() => {
            setLoading(false)
            setIsOpen(true)
          })
        })
      })
  }

  return (
    <>
      <Button
        size="lg"
        className={cn(
          "fixed right-4 top-4 h-14 text-lg shadow md:right-6 md:top-6",
          className
        )}
        onClick={handleClick}
        disabled={loading}
        {...props}
      >
        {loading ? "Creating..." : "Create Playlist"}
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yahoo!</DialogTitle>
            <DialogDescription>
              Check your Spotify for the Alchemelody playlist.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="font-sans text-sm">
            <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
              Stay on Alchemelody
            </Button>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Open Spotify
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
