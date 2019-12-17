import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import { ResponsivePie } from '@nivo/pie'
import { ChartContainer, MiddleContent } from './styles'

export default function PieChart({
  children,
  data,
  height,
  onLegendMouseEnter,
  onLegendMouseLeave,
  width,
  ...rest
}) {
  const theme = useContext(ThemeContext)
  return (
    <ChartContainer width={width} height={height}>
      <ResponsivePie
        {...rest}
        data={
          data || [
            {
              id: 'emptyvalue',
              value: 100,
              color: theme.colors.gray2,
            },
          ]
        }
        colors={data ? data.map(item => item.color) : [theme.colors.gray2]}
        innerRadius={0.95}
        padAngle={1}
        cornerRadius={3}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        legends={
          data
            ? [
                {
                  onMouseEnter: payload => {
                    if (onLegendMouseEnter) {
                      onLegendMouseEnter(payload)
                    }
                  },
                  onMouseLeave: () => {
                    if (onLegendMouseLeave) {
                      onLegendMouseLeave()
                    }
                  },
                  anchor: 'bottom',
                  direction: 'row',
                  symbolSize: 14,
                  itemWidth: 20,
                  itemHeight: 18,
                  itemsSpacing: 7,
                  itemTextColor: 'transparent',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        symbolSize: 21,
                      },
                    },
                  ],
                },
              ]
            : []
        }
      />
      {children && <MiddleContent>{children}</MiddleContent>}
    </ChartContainer>
  )
}

PieChart.defaultProps = {
  children: null,
  data: null,
  onLegendMouseEnter: null,
  onLegendMouseLeave: null,
}

PieChart.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ),
  height: PropTypes.string.isRequired,
  onLegendMouseEnter: PropTypes.func,
  onLegendMouseLeave: PropTypes.func,
  width: PropTypes.string.isRequired,
}
