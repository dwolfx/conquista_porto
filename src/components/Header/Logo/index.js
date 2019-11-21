import React from 'react'

import { ResponsiveLogoWrapper, Img, Text } from './styles'

import LogoConquistaBeta from '../../../assets/images/logo-temp.png'

export default function Logo() {
  return (
    <ResponsiveLogoWrapper to="/">
      <Img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
      <Text
        size={14}
        fontWeight={400}
        letterSpacing={1.5}
        upperCase
        lineHeight={19}
        textAlign="right"
      >
        Beta
      </Text>
    </ResponsiveLogoWrapper>
  )
}
