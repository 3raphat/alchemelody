const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const BASE_ENDPOINT = "https://api.spotify.com/v1"

const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })

  return response.json()
}

export const getTopItems = async (
  refresh_token: string,
  type: string,
  limit: number
) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(
    `${BASE_ENDPOINT}/me/top/${type}?time_range=short_term&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
}

export const getRecommendations = async (
  refresh_token: string,
  seed_tracks: string,
  limit: number,
  market: string
) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(
    `${BASE_ENDPOINT}/recommendations?limit=${limit}&seed_tracks=${seed_tracks}&market=${market}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
}

export const createPlaylist = async (
  refresh_token: string,
  user_id: string,
  name: string,
  description: string
) => {
  const { access_token } = await getAccessToken(refresh_token)

  const res = await fetch(`${BASE_ENDPOINT}/users/${user_id}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  })
  if (!res?.ok) return
  return res.json()
}

export const addItemsToPlaylist = async (
  refresh_token: string,
  playlist_id: string,
  uris: string
) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(
    `${BASE_ENDPOINT}/playlists/${playlist_id}/tracks?uris=${uris}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
}

export const addPlaylistCoverImage = async (
  refresh_token: string,
  playlist_id: string,
  image: string
) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${BASE_ENDPOINT}/playlists/${playlist_id}/images`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: image,
  })
}
