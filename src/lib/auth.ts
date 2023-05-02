import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Spotify Client ID")
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Spotify Client Secret")
  }

  return { clientId, clientSecret }
}

export const scopes = [
  "user-top-read",
  "user-read-private",
  "user-read-email",
  "ugc-image-upload",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
]

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: getSpotifyCredentials().clientId,
      clientSecret: getSpotifyCredentials().clientSecret,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(
        ","
      )}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user && account) {
        token.access_token = account.access_token
        token.user = user
        token.user.country = profile.country
      }
      return token
    },
    async session({ session, token }: any) {
      session.access_token = token.access_token
      session.user = token.user
      return session
    },
  },
}
