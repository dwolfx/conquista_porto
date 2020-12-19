import React from 'react'
import 'styled-components/macro'

import useMedia from 'hooks/useMedia'

import InsuranceSumaryDesktop from './Desktop'
import InsuranceSumaryTablet from './Tablet'

const InsuranceSumary = () => {
  const isTabletVertical = useMedia('md')
  return (
    <>
      {isTabletVertical ? (
        <InsuranceSumaryTablet />
      ) : (
        <InsuranceSumaryDesktop />
      )}
    </>
  )
}

export default InsuranceSumary
