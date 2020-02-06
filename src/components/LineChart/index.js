import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data }) => {
  const themeContext = useContext(ThemeContext)

  return (
    <ResponsiveLine
      data={data.data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
      curve="linear"
      markers={[
        {
          axis: 'y',
          value: data.financialGoal,
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
      colors={['#E72176', '#00ADEF', '#FFCD00']}
      pointSize={5}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'color', modifiers: [] }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh
      legends={[]}
      yFormat={value =>
        `R$ ${Number(value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}`
      }
      enableSlices="x"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                width: '15px',
                height: '15px',
                marginRight: '10px',
                backgroundColor: themeContext.colors.gray6,
              }}
            ></div>
            <div>{data.financialGoal}</div>
          </div>
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '10px',
                  backgroundColor: point.serieColor,
                }}
              ></div>
              <div>{point.data.yFormatted}</div>
            </div>
          ))}
        </div>
      )}
    />
  )
}

MyResponsiveLine.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MyResponsiveLine
