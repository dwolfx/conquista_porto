import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import { ResponsiveLine } from '@nivo/line'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'

import { formatMoney } from 'helpers'

import { LineChartContainer, ToolTipContainer, ReactInfoColor } from './styles'

const MyResponsiveLine = ({
  data,
  width,
  height,
  colors,
  customToolTip,
  marker,
}) => {
  const themeContext = useContext(ThemeContext)

  return (
    <LineChartContainer width={width} height={height}>
      <ResponsiveLine
        data={parseData(data)}
        margin={{ top: 10, right: 55, bottom: 30, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        curve="linear"
        markers={[
          {
            axis: 'y',
            value: marker,
            lineStyle: { stroke: themeContext.colors.gray6, strokeWidth: 1 },
          },
        ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 0,
          legendPosition: 'middle',
        }}
        axisLeft={null}
        gridYValues={5}
        colors={colors}
        pointSize={5}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'color', modifiers: [] }}
        pointLabel="y"
        pointLabelYOffset={12}
        useMesh
        enableCrosshair
        crosshairType="cross"
        yFormat={formatMoney}
        enableSlices="x"
        sliceTooltip={
          customToolTip ||
          (({ slice }) => (
            <ToolTipContainer key={slice.id}>
              <HorizontalList
                key="metaId"
                noPadding
                size="small"
                startItems={[
                  <ReactInfoColor color={themeContext.colors.gray6} />,
                  <Text type="caption" bold color="gray5">
                    Meta Financeira
                  </Text>,
                ]}
                endItems={[
                  <Text type="caption" bold>
                    {formatMoney(marker)}
                  </Text>,
                ]}
              />
              {slice.points.map(point => (
                <HorizontalList
                  key={point.id}
                  noPadding
                  size="small"
                  startItems={[
                    <ReactInfoColor color={point.serieColor} />,
                    <Text type="caption" bold color="gray5">
                      {nameMap[point.serieId]}
                    </Text>,
                  ]}
                  endItems={[
                    <Text type="caption" bold>
                      {point.data.yFormatted}
                    </Text>,
                  ]}
                />
              ))}
            </ToolTipContainer>
          ))
        }
      />
    </LineChartContainer>
  )
}

const parseData = oldData =>
  Object.keys(oldData).map(incomeItem => ({
    id: incomeItem,
    data: oldData[incomeItem].map(item => ({ x: item.month, y: item.value })),
  }))

const nameMap = {
  optimistic: 'Otimista',
  median: 'Mediano',
  pessimistic: 'Pessimista',
}

MyResponsiveLine.propTypes = {
  data: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  customToolTip: PropTypes.element,
  marker: PropTypes.number,
}

MyResponsiveLine.defaultProps = {
  customToolTip: null,
  marker: 0,
}

export default MyResponsiveLine
