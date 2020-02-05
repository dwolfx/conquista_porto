import React from 'react'
import PropTypes from 'prop-types'

import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
    curve="cardinal"
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
    colors={{ scheme: 'category10' }}
    pointSize={5}
    pointColor={{ from: 'color', modifiers: [] }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'color', modifiers: [] }}
    pointLabel="y"
    pointLabelYOffset={-12}
    enableCrosshair={false}
    useMesh
    legends={[]}
  />
)

MyResponsiveLine.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MyResponsiveLine
