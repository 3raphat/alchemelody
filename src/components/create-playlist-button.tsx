import React from "react"
import confetti from "canvas-confetti"
import { useSession } from "next-auth/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Button, ButtonProps, buttonVariants } from "~/components/ui/button"
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
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
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
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yahoo!</AlertDialogTitle>
            <AlertDialogDescription>
              Check your Spotify for the Alchemelody playlist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            >
              Stay on Alchemelody
            </AlertDialogCancel>
            <AlertDialogAction className={cn(buttonVariants({ size: "sm" }))}>
              <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
                Open Spotify
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
