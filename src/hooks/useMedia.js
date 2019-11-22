import { useState, useEffect } from 'react'
import breakpoints from 'styles/breakpoints'

export default function useMedia(size) {
  const selectedProp = breakpoints[size]

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
