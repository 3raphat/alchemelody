import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "~/lib/auth"
import { addPlaylistCoverImage } from "~/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const access_token = session?.access_token as string

  const { playlist_id } = req.query as {
    playlist_id: string
  }
  const { image } = req.body as {
    image: string
  }
  await addPlaylistCoverImage(access_token, playlist_id, image)

  return res.status(200).json({ success: true })
}
