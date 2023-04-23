import React from "react"
import { CornerDownLeft, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { SpotifyContext } from "~/context/spotify-context"

export default function InputForm() {
  const { data: session } = useSession()
  const { setRecommendations } = React.useContext(SpotifyContext)

  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    fetch(`/api/top-items?type=tracks&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `/api/recommendations?limit=${input}&seed_tracks=${data
            .map((track: any) => track.id)
            .join(",")}&market=${session?.user.country}`
        )
          .then((res) => res.json())
          .then((data) => {
            setRecommendations(data.tracks)
            setLoading(false)
          })
      })
  }

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <Input
        className="h-16 px-8 text-3xl md:h-20 md:text-4xl"
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        min={1}
        max={100}
      />
      <Button
        className="absolute right-0 top-0 h-16 px-12 md:h-20"
        type="submit"
        disabled={!input || loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <CornerDownLeft />}
      </Button>
    </form>
  )
}
