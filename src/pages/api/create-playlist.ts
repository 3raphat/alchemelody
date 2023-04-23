import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "~/lib/auth"
import { createPlaylist } from "~/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const access_token = session?.access_token as string

  const { user_id } = req.query as {
    user_id: string
  }
  const { name, description } = req.body as {
    name: string
    description: string
  }
  const response = await createPlaylist(
    access_token,
    user_id,
    name,
    description
  )

  return res.status(200).json(response)
}
