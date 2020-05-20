import React from 'react'

import { Accordion, HeaderTitle } from './styles'

import Divisor from 'components/Divisor'
import TabProfitability from '../TabProfitability'
import { IFundProps } from '../TabProfitability/interfaces'

export default function AccordionProfitability({ fund }: IFundProps) {
  return (
    <Accordion
      bodyPadding="0px"
      titleNode={<HeaderTitle>Rendimentos</HeaderTitle>}
      openByDefault
      triggerCloseOnArrow
    >
      <Divisor />
      <TabProfitability fund={fund} />
    </Accordion>
  )
}
