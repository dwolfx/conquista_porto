import React, { useContext, useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import { ResponsivePie } from '@nivo/pie'
import { ChartContainer, MiddleContent } from './styles'

export default function PieChart({
  children,
  data,
  height,
  onMouseEnter,
  onMouseLeave,
  onSliceClick,
  width,
  hideLegend,
  ...rest
}) {
  const chartReducer = (state = data, action) => {
    const { payload, type } = action
    switch (type) {
      case 'click': {
        if (payload.color.endsWith('33')) {
          return [
            ...data.map(item => {
              if (item.id !== payload.id) {
                return { ...item, color: `${item.color}33` }
              }
              return item
            }),
          ]
        }
        return [...state]
      }
      case 'mouseEnter': {
        if (!payload) {
          return state
        }
        return [
          ...state.map(item => {
            if (item.id !== payload.id) {
              return { ...item, color: `${item.color}33` }
            }
            return item
          }),
        ]
      }
      case 'mouseLeave':
        return [...data]
      default:
        return state
    }
  }

  function handleMouseEnter(payload, event) {
    // eslint-disable-next-line no-param-reassign
    event.target.style.cursor = 'pointer'
    if (!preventOnMouse) {
      dispatch({ type: 'mouseEnter', payload })
      if (onMouseEnter) {
        console.log(payload)

        onMouseEnter(payload)
      }
    }
  }

  function handleLegendMouseEnter(payload, event) {
    // eslint-disable-next-line no-param-reassign
    event.target.style.cursor = 'pointer'
    if (!preventOnMouse) {
      dispatch({ type: 'mouseEnter', payload })
      if (onMouseEnter) {
        const filterResult = chartData.find(
          element => element.id === payload.id
        )
        onMouseEnter(filterResult)
      }
    }
  }

  function handleMouseLeave() {
    if (!preventOnMouse) {
      dispatch({ type: 'mouseLeave' })
      if (onMouseLeave) {
        onMouseLeave(null)
      }
    }
  }

  function handleClick(payload) {
    dispatch({ type: 'click', payload })
    setPreventOnMouse(payload.color.endsWith('33') ? true : !preventOnMouse)
    if (onSliceClick) {
      onSliceClick(payload.color.endsWith('33') ? payload : null)
    }
  }

  const theme = useContext(ThemeContext)
  const [chartData, dispatch] = useReducer(chartReducer, data)
  const [preventOnMouse, setPreventOnMouse] = useState(false)

  useEffect(() => {
    dispatch({ type: 'mouseLeave' })
  }, [data.length])

  return (
    <ChartContainer width={width} height={height}>
      <ResponsivePie
        {...rest}
        data={
          chartData && chartData.length > 0
            ? chartData
            : [
                {
                  id: 'emptyvalue',
                  value: 100,
                  color: theme.colors.gray2,
                },
              ]
        }
        colors={
          chartData.length > 0
            ? chartData.map(item => item.color)
            : [theme.colors.gray2]
        }
        innerRadius={0.94}
        padAngle={1}
        cornerRadius={3}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        legends={
          !hideLegend && data
            ? [
                {
                  onMouseEnter: handleLegendMouseEnter,
                  onMouseLeave: handleMouseLeave,
                  onClick: handleClick,
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
  onMouseEnter: null,
  onMouseLeave: null,
  onSliceClick: null,
  hideLegend: false,
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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSliceClick: PropTypes.func,
  width: PropTypes.string.isRequired,
  hideLegend: PropTypes.bool,
}
