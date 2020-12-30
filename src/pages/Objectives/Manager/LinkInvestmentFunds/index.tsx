import React from 'react'
import { ILinkableFunds } from './types'
import useMedia from 'hooks/useMedia'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function LinkInvestmentFundsDesktop(props: {
  funds: ILinkableFunds[]
  onSuccess?: () => void
}) {
  const isMobile = useMedia('sm')

  return <>{isMobile ? <Mobile {...props} /> : <Desktop {...props} />}</>
}
