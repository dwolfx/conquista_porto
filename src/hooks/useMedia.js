import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'

export default function useMedia(size) {
  const theme = useContext(ThemeContext)
  const selectedProp = theme.mediaQueries[size]

  const [mediaMatch, setMedia] = useState(
    window.matchMedia(selectedProp).matches
  )
  const handleMediaChange = ({ matches }) => {
    setMedia(matches)
  }
  useEffect(() => {
    window.matchMedia(selectedProp).addListener(handleMediaChange)

    return () => {
      window.matchMedia(selectedProp).removeListener(handleMediaChange)
    }
  }, [selectedProp])
  return mediaMatch
}
