import React from "react"

export const SpotifyContext = React.createContext({
  recommendations: [],
  setRecommendations: (recommendations: any) => {},
})

export const SpotifyProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [recommendations, setRecommendations] = React.useState([])

  return (
    <SpotifyContext.Provider
      value={{
        recommendations,
        setRecommendations,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  )
}
