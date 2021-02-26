import React from 'react'

import { IUseHandleScrollReturn } from './types'

const useHandleScroll = (): IUseHandleScrollReturn => {
  // Navigation states > Ref
  const [activeMenuItem, setActiveMenuItem] = React.useState<string>(
    'section-1'
  )
  const sectionOne = React.useRef<HTMLTableSectionElement | null>(null)
  const sectionTwo = React.useRef<HTMLTableSectionElement | null>(null)
  const sectionThree = React.useRef<HTMLTableSectionElement | null>(null)
  const sectionFour = React.useRef<HTMLTableSectionElement | null>(null)
  const sectionFive = React.useRef<HTMLTableSectionElement | null>(null)
  const sectionSix = React.useRef<HTMLTableSectionElement | null>(null)

  const scrollListenerFunc = React.useCallback(() => {
    const layerBody = window.document.getElementById('layer-children')
    let sectionOnePos = null
    let sectionTwoPos = null
    let sectionThreePos = null
    let sectionFourPos = null
    let sectionFivePos = null
    let sectionSixPos = null

    if (
      !!sectionOne.current &&
      !!sectionTwo.current &&
      !!sectionThree.current &&
      !!sectionFour.current &&
      !!sectionFive.current &&
      !!sectionSix.current
    ) {
      sectionOnePos = sectionOne.current.offsetTop
      sectionTwoPos = sectionTwo.current.offsetTop
      sectionThreePos = sectionThree.current.offsetTop
      sectionFourPos = sectionFour.current.offsetTop
      sectionFivePos = sectionFive.current.offsetTop
      sectionSixPos = sectionSix.current.offsetTop

      if (layerBody !== null) {
        const { offsetHeight, scrollTop, scrollHeight } = layerBody
        if (
          offsetHeight + scrollTop >= scrollHeight ||
          scrollTop >= sectionSixPos
        ) {
          setActiveMenuItem('section-6')
        } else if (scrollTop <= sectionOnePos) {
          setActiveMenuItem('section-1')
        } else if (scrollTop > sectionOnePos && scrollTop <= sectionTwoPos) {
          setActiveMenuItem('section-2')
        } else if (scrollTop > sectionTwoPos && scrollTop <= sectionThreePos) {
          setActiveMenuItem('section-3')
        } else if (scrollTop > sectionThreePos && scrollTop <= sectionFourPos) {
          setActiveMenuItem('section-4')
        } else if (scrollTop > sectionFourPos && scrollTop <= sectionFivePos) {
          setActiveMenuItem('section-5')
        }
      }
    }
  }, [])

  React.useEffect(() => {
    const layerBody = window.document.getElementById('layer-children')
    if (layerBody !== null) {
      layerBody.addEventListener('scroll', scrollListenerFunc)
    }
    return () => layerBody?.removeEventListener('scroll', scrollListenerFunc)
  }, [scrollListenerFunc])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    const section = document.querySelector('#layer-children')

    if (ref.current) {
      return section?.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
    return false
  }

  return {
    activeMenuItem,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive,
    sectionSix,
    scrollToSection,
  }
}

export default useHandleScroll
