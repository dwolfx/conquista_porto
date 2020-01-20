import React from 'react'
import PropTypes from 'prop-types'

import { Text, Table, Section } from './styles'

export default function RentabilityHistoric({ fund }) {
  return (
    <Section>
      <Text>Histórico de Rentabilidade</Text>
      <Table tableWidth="80%">
        <thead>
          <tr>
            <th>{}</th>
            <th align="center">MÊS ANTERIOR</th>
            <th align="center">12 MESES</th>
            <th align="center">24 MESES</th>
            <th align="center">36 MESES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">Rentabilidade em %</td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_fundo
                  .rentabil_mes_anteiror
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_fundo
                  .rentabil_12_meses
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_fundo
                  .rentabil_24_meses
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_fundo
                  .rentabil_36_meses
              }
              %
            </td>
          </tr>
          <tr>
            <td align="center">Referência em {fund.benchmark.nome} *</td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_benchmark
                  .rentabil_mes_anteiror
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_benchmark
                  .rentabil_12_meses
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_benchmark
                  .rentabil_24_meses
              }
              %
            </td>
            <td align="center">
              {
                fund.comparativo_hist_rentabil.hist_rentabil_benchmark
                  .rentabil_36_meses
              }
              %
            </td>
          </tr>
        </tbody>
      </Table>
      <Text fontSize="12px" lineHeight="22px">
        *O {fund.benchmark.nome} é uma referência do mercado para quanto seu
        dinheiro pode render. A referência é dada com base no valor ganho pelos
        bancos de um dia para outro.
      </Text>
    </Section>
  )
}

RentabilityHistoric.propTypes = {
  fund: PropTypes.shape({
    comparativo_hist_rentabil: PropTypes.shape({
      hist_rentabil_fundo: PropTypes.shape({
        rentabil_mes_anteiror: PropTypes.string,
        rentabil_12_meses: PropTypes.string,
        rentabil_24_meses: PropTypes.string,
        rentabil_36_meses: PropTypes.string,
      }),
      hist_rentabil_benchmark: PropTypes.shape({
        rentabil_mes_anteiror: PropTypes.string,
        rentabil_12_meses: PropTypes.string,
        rentabil_24_meses: PropTypes.string,
        rentabil_36_meses: PropTypes.string,
      }),
    }),
    benchmark: PropTypes.shape({
      nome: PropTypes.string,
    }),
  }).isRequired,
}
