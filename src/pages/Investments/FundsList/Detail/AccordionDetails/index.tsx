import React from 'react'

import { Accordion, HeaderTitle } from './styles'

import Divisor from 'components/Divisor'
import TabDetails from '../TabDetails'

interface IAliquota {
  faixa: string
  valor: string
}

interface IFund {
  fund: {
    minimo_inicial: string
    aplicao_minima: string
    saldo_minimo?: number | string
    hora_aplicacao: string
    aplicacao_cotizacao: string
    aplicacao_financeiro: string
    resgate_cotizacao: string
    resgate_financeiro: string
    categoria: string
    perfil_risco: string
    classificacao: string
    aliquotas_ir: { aliquota: IAliquota[] }
    regime_iof: string
  }
}

const AccordionDetails = ({ fund }: IFund) => {
  return (
    <Accordion
      bodyPadding="0px"
      titleNode={<HeaderTitle>Detalhes</HeaderTitle>}
      openByDefault
      triggerCloseOnArrow
    >
      <Divisor />
      <TabDetails fund={fund} />
    </Accordion>
  )
}

export default AccordionDetails
