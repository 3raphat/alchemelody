import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "~/lib/auth"
import { getTopItems } from "~/lib/spotify"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const access_token = session?.access_token as string

  const { type, limit } = req.query as {
    type: string
    limit: string
  }
  const response = await getTopItems(access_token, type, parseInt(limit))
  const { items } = await response.json()

  return res.status(200).json(items)
}
