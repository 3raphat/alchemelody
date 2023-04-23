import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "experimental-edge",
}

const fontRegular = fetch(
  new URL("../../assets/fonts/Lora-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const fontBold = fetch(
  new URL("../../assets/fonts/Lora-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler() {
  const [regular, bold] = await Promise.all([fontRegular, fontBold])

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center bg-[#271a41] text-[#e4cb7f]">
        <div tw="text-6xl font-bold">Alchemelody</div>
        <div tw="font-normal mt-4">
          Unleash the Magic of Music with Alchemelody - Your Ultimate Source for
          Curated Spotify Playlists
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Lora",
          data: regular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Lora",
          data: bold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
