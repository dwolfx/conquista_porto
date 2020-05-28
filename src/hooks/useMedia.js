import { useState, useEffect, useContext, useRef } from 'react'
import { ThemeContext } from 'styled-components'

export default function useMedia(size) {
  const isMountedRef = useRef(null)
  const theme = useContext(ThemeContext)
  const selectedProp = theme.mediaQueries[size]

  const [mediaMatch, setMedia] = useState(
    window.matchMedia(selectedProp).matches
  )
  const handleMediaChange = ({ matches }) => {
    if (isMountedRef.current) {
      setMedia(matches)
    }
  }
  useEffect(() => {
    isMountedRef.current = true
    window.matchMedia(selectedProp).addListener(handleMediaChange)

    return () => {
      isMountedRef.current = false
      window.matchMedia(selectedProp).removeListener(handleMediaChange)
    }
  }, [selectedProp])
  return mediaMatch
}
