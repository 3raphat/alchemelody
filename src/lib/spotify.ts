const BASE_ENDPOINT = "https://api.spotify.com/v1"

export const getTopItems = async (
  access_token: string,
  type: string,
  limit: number
) => {
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
  access_token: string,
  seed_tracks: string,
  limit: number,
  market: string
) => {
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
  access_token: string,
  user_id: string,
  name: string,
  description: string
) => {
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
  access_token: string,
  playlist_id: string,
  uris: string
) => {
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
  access_token: string,
  playlist_id: string,
  image: string
) => {
  return fetch(`${BASE_ENDPOINT}/playlists/${playlist_id}/images`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: image,
  })
}
