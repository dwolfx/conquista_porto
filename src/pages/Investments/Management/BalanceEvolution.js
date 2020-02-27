import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import moment from 'moment'
import { ResponsiveLine } from '@nivo/line'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'

import { Section, ChartContainer, ChartTooltip, Text } from './styles'

export default function BalanceEvolution({ fund }) {
  const theme = useContext(ThemeContext)
  const balanceEvolutionData = () => {
    const saldosFlat = [fund.historico_saldos_fundo.saldos.saldo].flatMap(
      item => item
    )
    const balanceData = saldosFlat.map(item => ({
      x: moment(item.data).format('DD/MM/YYYY'),
      y: item.valorsaldo,
    }))

    return [...balanceData]
  }

  return (
    <Section>
      <Text>Evolução do saldo</Text>
      <ChartContainer>
        <ResponsiveLine
          data={[
            {
              id: 'balance',
              color: theme.colors.blue4,
              data: balanceEvolutionData(),
            },
          ]}
          margin={{ top: 50, right: 20, bottom: 70, left: 90 }}
          yFormat={formatMoney}
          axisLeft={{ format: formatMoney }}
          xScale={{ type: 'point' }}
          enableSlices="x"
          yScale={{
            type: 'linear',
            stacked: true,
            min: 0,
            max: 'auto',
          }}
          sliceTooltip={({ slice }) => (
            <ChartTooltip>
              {slice.points.map(point => (
                <span key={point.id}>{point.data.yFormatted}</span>
              ))}
            </ChartTooltip>
          )}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickPadding: 10,
            tickRotation: -54,
          }}
          colors={{ scheme: 'category10' }}
          pointColor={{ from: 'color' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'color' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          enableArea
          useMesh
          legends={[]}
        />
      </ChartContainer>
    </Section>
  )
}

BalanceEvolution.propTypes = {
  fund: PropTypes.shape({
    historico_saldos_fundo: PropTypes.shape({
      saldos: PropTypes.shape({
        saldo: PropTypes.array,
      }),
    }),
  }).isRequired,
}
