"use client"

import React from "react"
import prettyMilliseconds from "pretty-ms"
import BackButton from "~/components/back-button"
import CreatePlaylistButton from "~/components/create-playlist-button"
import InputForm from "~/components/input-form"
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderText,
} from "~/components/page-header"
import { UserNav } from "~/components/user-nav"
import { SpotifyContext } from "~/context/spotify-context"

interface PageProps {}

export default function Page({}: PageProps) {
  const { recommendations } = React.useContext(SpotifyContext)

  return (
    <div className="relative">
      <BackButton />
      <div className="container flex flex-col gap-6 py-16">
        <PageHeader>
          <PageHeaderText>
            Hello, <UserNav />
          </PageHeaderText>
          <PageHeaderHeading>
            How many tracks do you want to discover?
          </PageHeaderHeading>
          <PageHeaderText>
            Enter a number between 1 and 100. If you would like a new track
            list, you can submit it again.
          </PageHeaderText>
        </PageHeader>
        <InputForm />
        {recommendations?.length > 0 && (
          <>
            <table className="table-fixed border text-primary">
              <thead className="bg-primary text-left text-lg uppercase text-primary-foreground">
                <tr>
                  <th className="px-6 py-5">Title</th>
                  <th className="px-6 py-5">Artist</th>
                  <th className="px-6 py-5">Album</th>
                  <th className="px-6 py-5">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((track: any) => (
                  <tr key={track.id} className="even:bg-primary/5">
                    <td className="px-6 py-4">
                      <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-lighter"
                      >
                        {track.name}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {track.artists
                        .map((artist: any) => (
                          <a
                            key={artist.id}
                            href={artist.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-lighter"
                          >
                            {artist.name}
                          </a>
                        ))
                        .reduce((prev: string, curr: string) => [
                          prev,
                          ", ",
                          curr,
                        ])}
                    </td>
                    <td className="px-6 py-4">{track.album.name}</td>
                    <td className="px-6 py-4">
                      {prettyMilliseconds(track.duration_ms, {
                        colonNotation: true,
                        secondsDecimalDigits: 0,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CreatePlaylistButton />
          </>
        )}
      </div>
    </div>
  )
}
