import React from 'react'

import RiskProfileBar from './RiskProfileBar'
import Transactions from './Transactions'
import Taxation from './Taxation'

import { ContentWrapper, GrayLine } from './styles'

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

export const TabDetails = ({ fund }: IFund) => (
  <ContentWrapper>
    <RiskProfileBar riskProfile={fund.perfil_risco} />
    <GrayLine />
    <Transactions fund={fund} />
    <GrayLine />
    <Taxation fund={fund} />
  </ContentWrapper>
)

export default TabDetails
