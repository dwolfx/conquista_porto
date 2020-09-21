import React, { useContext, useReducer, useState, useEffect } from 'react'
import { CSSProp, DefaultTheme, ThemeContext } from 'styled-components'
import 'styled-components/macro'

import { ResponsivePie, PieCanvasProps } from '@nivo/pie'
import { ChartContainer, MiddleContent } from './styles'

interface IProps extends PieCanvasProps {
  data: any
  height: any
  onMouseEnter?: any
  onMouseLeave?: any
  onSliceClick?: any
  width: any
  hideLegend?: any
  marginLegend?: any
  middleContentCSS?: CSSProp<DefaultTheme>
}

type ChartDataType = {
  id: string | number
  color: string
  percent: string
  value: number
  label: string
}

type ChartActionDataType = {
  type: string
  payload?: ChartDataType
}

const PieChart: React.FC<IProps> = ({
  children,
  data = null,
  height,
  onMouseEnter = null,
  onMouseLeave = null,
  onSliceClick = null,
  width,
  hideLegend = false,
  marginLegend = null,
  middleContentCSS,
  ...rest
}) => {
  const chartReducer = (state = data, action: ChartActionDataType) => {
    const { payload, type } = action
    switch (type) {
      case 'click': {
        if (payload?.color.endsWith('33')) {
          return [
            ...data.map((item: ChartDataType) => {
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
          ...state.map((item: ChartDataType) => {
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

  function handleMouseEnter(payload: any, event: any) {
    // eslint-disable-next-line no-param-reassign
    event.target.style.cursor = 'pointer'
    if (!preventOnMouse) {
      dispatch({ type: 'mouseEnter', payload })
      fireOnMouseEnter(payload.id)
    }
  }

  function handleLegendMouseEnter(payload: any, event: any) {
    // eslint-disable-next-line no-param-reassign
    event.target.style.cursor = 'pointer'
    if (!preventOnMouse) {
      dispatch({ type: 'mouseEnter', payload })
      fireOnMouseEnter(payload.id)
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

  function fireOnMouseEnter(id: string | number) {
    if (onMouseEnter) {
      const filterResult = chartData.find(
        (element: ChartDataType) => element.id === id
      )
      onMouseEnter(filterResult)
    }
  }

  function handleClick(payload: any) {
    dispatch({ type: 'click', payload })
    setPreventOnMouse(payload.color.endsWith('33') ? true : !preventOnMouse)
    if (onSliceClick) {
      const filterResult = chartData.find(
        (element: ChartDataType) => element.id === payload.id
      )
      onSliceClick(filterResult)
    }
  }

  const theme = useContext(ThemeContext)
  const [chartData, dispatch] = useReducer(chartReducer, data)
  const [preventOnMouse, setPreventOnMouse] = useState(false)

  useEffect(() => {
    dispatch({ type: 'mouseLeave' })
  }, [data.length])

  // https://nivo.rocks/guides/legends
  const CustomSymbolShape = ({
    x,
    y,
    size,
    fill,
    borderWidth,
    borderColor,
  }: any) => (
    <rect
      x={x}
      y={y}
      rx={3}
      fill={fill}
      strokeWidth={borderWidth}
      stroke={borderColor}
      width={size}
      height={size}
      style={{ pointerEvents: 'none' }}
    />
  )

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
            ? chartData.map((item: ChartDataType) => item.color)
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
                  symbolShape: CustomSymbolShape,
                  symbolSize: 14,
                  itemWidth: 20,
                  translateY: marginLegend ? marginLegend : -7,
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
      {children && (
        <MiddleContent css={middleContentCSS}>{children}</MiddleContent>
      )}
    </ChartContainer>
  )
}

export default PieChart
