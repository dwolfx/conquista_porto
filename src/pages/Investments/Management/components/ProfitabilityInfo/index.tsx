import React from 'react'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'
import { formatNumber } from 'helpers'
import { handleVariance } from '../../utils'

import {
  CardStyled,
  VerticalListStyled,
  HorizonalListStyled,
  TextHeader,
  TextTitle,
  TextValue,
  StyledCol,
} from './styles'

interface IProps {
  profitability?: {
    hist_rentabil_benchmark: {
      rentabil_Ano: string
      rentabil_24_meses: string
      rentabil_12_meses: string
      rentabil_36_meses: string
      rentabil_dia: string
      rentabil_mes_anteiror: string
      benchmark: {
        nome: string
        id: string
      }
      rentabil_mes: string
    }
    hist_rentabil_fundo: {
      rel_fundo_benchmark_mes_ant: string
      rentabil_ano: string
      rentabil_12_meses: string
      rentabil_36_meses: string
      rel_fundo_benchmark_mes: string
      rel_fundo_benchmark_dia: string
      rentabil_mes_anteiror: string
      rel_fundo_benchmark_24_meses: string
      rel_fundo_benchmark_ano: string
      rentabil_24_meses: string
      rel_fundo_benchmark_36_meses: string
      id_carteira: string
      rentabil_dia: string
      rentabil_mes: string
      rel_fundo_benchmark_12_meses: string
    }
    data_referencia: string
  }
}
const ProfitabilityInfo = ({ profitability }: IProps) => {
  const printFieldText = (text: string) => text || '--'
  const printFieldTextWithPercent = (text: string) =>
    text && text !== '-' ? `${formatNumber(text)}%` : '--'

  return (
    <Row>
      <StyledCol md={6} sm={12}>
        <CardStyled data-testid="test-card-profitability">
          <TextHeader>rentabilidade em %*</TextHeader>
          <VerticalListStyled
            elements={[
              <HorizonalListStyled
                startItems={[<TextTitle>MẼS ANTERIOR</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_fundo.rentabil_mes_anteiror
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ANO</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_fundo.rentabil_ano
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ÚLT. 12M</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_fundo.rentabil_12_meses
                      )}
                  </TextValue>,
                ]}
              />,
            ]}
          />
        </CardStyled>
      </StyledCol>
      <StyledCol md={6} sm={12}>
        <CardStyled data-testid="test-card-profitability">
          <TextHeader>
            {`Referência em
            ${profitability &&
              printFieldText(
                profitability.hist_rentabil_benchmark.benchmark.nome
              )}*`}
          </TextHeader>
          <VerticalListStyled
            elements={[
              <HorizonalListStyled
                startItems={[<TextTitle>MẼS ANTERIOR</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_benchmark
                          .rentabil_mes_anteiror
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ANO</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_benchmark.rentabil_Ano
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ÚLT. 12M</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      printFieldTextWithPercent(
                        profitability.hist_rentabil_benchmark.rentabil_12_meses
                      )}
                  </TextValue>,
                ]}
              />,
            ]}
          />
        </CardStyled>
      </StyledCol>
      <StyledCol md={12}>
        <CardStyled data-testid="test-card-profitability">
          <TextHeader>Variância (P.P.)</TextHeader>
          <VerticalListStyled
            elements={[
              <HorizonalListStyled
                startItems={[<TextTitle>MẼS ANTERIOR</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      handleVariance(
                        profitability?.hist_rentabil_benchmark.benchmark.nome,
                        profitability?.hist_rentabil_fundo
                          .rentabil_mes_anteiror,
                        profitability?.hist_rentabil_benchmark
                          .rentabil_mes_anteiror
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ANO</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      handleVariance(
                        profitability?.hist_rentabil_benchmark.benchmark.nome,
                        profitability?.hist_rentabil_fundo.rentabil_ano,
                        profitability?.hist_rentabil_benchmark.rentabil_Ano
                      )}
                  </TextValue>,
                ]}
              />,
              <HorizonalListStyled
                startItems={[<TextTitle>ÚLT. 12M</TextTitle>]}
                endItems={[
                  <TextValue>
                    {profitability &&
                      handleVariance(
                        profitability?.hist_rentabil_benchmark.benchmark.nome,
                        profitability?.hist_rentabil_fundo.rentabil_12_meses,
                        profitability?.hist_rentabil_benchmark.rentabil_12_meses
                      )}
                  </TextValue>,
                ]}
              />,
            ]}
          />
        </CardStyled>
      </StyledCol>
    </Row>
  )
}

export default ProfitabilityInfo
