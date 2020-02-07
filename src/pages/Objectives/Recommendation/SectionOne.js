import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import Text from 'components/Text'
import PieChart from 'components/PieChart'
import HorizontalList from 'components/HorizontalList'
import { formatMoney } from 'helpers'
import LineChart from 'components/Charts/LineChart'
import {
  GridRow,
  FullHeightCard,
  SectionRow,
  SectionCol,
  SuggestedProduct,
  PieChartContainer,
  PieChartChildrenContainer,
} from './styles'

const dataLine = {
  financialGoal: 1600,
  data: [
    {
      id: 'otimista',
      color: '#E72176',
      data: [
        {
          x: 'Jan/01',
          y: 1000,
        },
        {
          x: 'Jan/02',
          y: 1200,
        },
        {
          x: 'Jan/03',
          y: 1300,
        },
        {
          x: 'Jan/04',
          y: 1400,
        },
        {
          x: 'Jan/05',
          y: 1500,
        },
        {
          x: 'Jan/06',
          y: 1600,
        },
        {
          x: 'Jan/07',
          y: 1700,
        },
        {
          x: 'Jan/09',
          y: 2000,
        },
      ],
    },
    {
      id: 'bom',
      color: '#00ADEF',
      data: [
        {
          x: 'Jan/01',
          y: 1000,
        },
        {
          x: 'Jan/02',
          y: 1150,
        },
        {
          x: 'Jan/03',
          y: 1200,
        },
        {
          x: 'Jan/04',
          y: 1280,
        },
        {
          x: 'Jan/05',
          y: 1360,
        },
        {
          x: 'Jan/06',
          y: 1420,
        },
        {
          x: 'Jan/07',
          y: 1590,
        },
        {
          x: 'Jan/09',
          y: 1700,
        },
      ],
    },
    {
      id: 'fraco',
      color: 'hsl(2, 70%, 50%)',
      data: [
        {
          x: 'Jan/01',
          y: 1000,
        },
        {
          x: 'Jan/02',
          y: 1100,
        },
        {
          x: 'Jan/03',
          y: 1150,
        },
        {
          x: 'Jan/04',
          y: 1220,
        },
        {
          x: 'Jan/05',
          y: 1280,
        },
        {
          x: 'Jan/06',
          y: 1350,
        },
        {
          x: 'Jan/07',
          y: 1420,
        },
        {
          x: 'Jan/09',
          y: 1500,
        },
      ],
    },
  ],
}

const SectionOne = ({ goal, combo }) => {
  const theme = useContext(ThemeContext)
  const [pieChartInfoChildren, setPieChartInfoChildren] = useState(null)

  const graphValuesGenerator = () => {
    const colorsPriority = [theme.colors.magenta2, theme.colors.blue4].reverse()
    const sortedData = [...combo].sort((a, b) => a.totalValue - b.totalValue)

    return sortedData.map((item, index) => ({
      id: item.title,
      label: item.title,
      value: item.totalValue,
      color: colorsPriority[index],
    }))
  }

  const renderPieChartChildrenNode = () => (
    <>
      <Text color="gray4" type="captionUppercase">
        {pieChartInfoChildren ? pieChartInfoChildren.label : 'meta'}
      </Text>
      <Text type="headline">
        {pieChartInfoChildren
          ? formatMoney(pieChartInfoChildren.value)
          : formatMoney(goal.targetValue)}
      </Text>
    </>
  )

  function settingPieChartInfoChildren(payload) {
    setPieChartInfoChildren(payload)
  }

  return (
    <GridRow height="430px">
      <Col lg="6">
        <FullHeightCard
          headerIcon="piechart"
          headerTitle={
            combo.length > 1 ? 'Combinação sugerida' : 'Produto sugerido'
          }
        >
          <SectionRow padding="30px 21px">
            <SectionCol md="5">
              <PieChartContainer>
                <PieChart
                  width="100%"
                  height="300px"
                  data={graphValuesGenerator()}
                  onMouseEnter={settingPieChartInfoChildren}
                  onSliceClick={settingPieChartInfoChildren}
                  onMouseLeave={settingPieChartInfoChildren}
                >
                  <PieChartChildrenContainer>
                    {renderPieChartChildrenNode()}
                  </PieChartChildrenContainer>
                </PieChart>
              </PieChartContainer>
            </SectionCol>
            <SectionCol md="7" display="flex">
              {combo.map(item => (
                <SuggestedProduct key={item.title}>
                  <HorizontalList
                    startItems={[
                      <Text type="headline" color="gray5">
                        {item.title}
                      </Text>,
                    ]}
                  />
                  {Object.entries(item.values).map(value => (
                    <HorizontalList
                      key={value[0]}
                      startItems={[
                        <Text type="body" color="gray6">
                          {value[0]}
                        </Text>,
                      ]}
                      endItems={[
                        <Text type="headline" color="gray6" bold>
                          {value[1]}
                        </Text>,
                      ]}
                    />
                  ))}
                </SuggestedProduct>
              ))}
            </SectionCol>
          </SectionRow>
        </FullHeightCard>
      </Col>

      <Col lg="6">
        <FullHeightCard headerIcon="linechart" headerTitle="Rendimentos">
          <LineChart data={dataLine} width="100%" height="300px" />
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

SectionOne.propTypes = {
  goal: PropTypes.object,
  combo: PropTypes.array,
}

SectionOne.defaultProps = {
  goal: {},
  combo: [],
}

export default SectionOne
