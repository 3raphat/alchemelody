import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "~/lib/auth"
import { getRecommendations } from "~/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const access_token = session?.access_token as string

  const { seed_tracks, limit, market } = req.query as {
    seed_tracks: string
    limit: string
    market: string
  }

  const response = await getRecommendations(
    access_token,
    seed_tracks,
    parseInt(limit),
    market
  )

  const data = await response.json()

  return res.status(200).json(data)
}
