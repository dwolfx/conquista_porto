import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import Text from 'components/Text'
import PieChart from 'components/PieChart'
import HorizontalList from 'components/HorizontalList'
import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'
import LineChart from 'components/Charts/LineChart'
import {
  GridRow,
  FullHeightCard,
  SectionRow,
  SectionCol,
  CardRow,
  SuggestedProduct,
  PieChartContainer,
  PieChartChildrenContainer,
} from './styles'

const SectionOne = ({ answer, combo, income }) => {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')
  const [pieChartInfoChildren, setPieChartInfoChildren] = useState(null)
  const colorsLineChart = [
    theme.colors.magenta2,
    theme.colors.blue4,
    theme.colors.yellow2,
  ]

  const graphValuesGenerator = () => {
    const colorsPriority = [theme.colors.magenta2, theme.colors.blue4].reverse()
    const sortedData = [...combo].sort((a, b) => a.total_value - b.total_value)

    return sortedData.map((item, index) => ({
      id: item.title,
      label: item.title,
      value: item.total_value,
      color: colorsPriority[index],
    }))
  }

  const renderPieChartChildrenNode = () => (
    <>
      <Text color="gray4" type="captionUppercase">
        {pieChartInfoChildren ? pieChartInfoChildren.label : 'meta'}
      </Text>
      <Text truncate type="headline">
        {pieChartInfoChildren
          ? formatMoney(pieChartInfoChildren.value)
          : formatMoney(answer.target_value)}
      </Text>
    </>
  )

  function settingPieChartInfoChildren(payload) {
    setPieChartInfoChildren(payload)
  }

  return (
    <GridRow height={isMobile ? 'auto' : '430px'}>
      <Col
        lg="6"
        css={`
          margin-bottom: ${isMobile ? '14px' : '0px'};
        `}
      >
        <FullHeightCard
          headerIcon="piechart"
          headerTitle={
            combo.length > 1 ? 'Combinação sugerida' : 'Produto sugerido'
          }
        >
          <SectionRow padding={isMobile ? '0px' : '30px 21px'}>
            <SectionCol
              md="5"
              css={`
                height: ${isMobile ? 'auto' : '100%'};
              `}
            >
              <PieChartContainer>
                <PieChart
                  marginLegend={0}
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
            <SectionCol
              md="7"
              display="flex"
              css={`
                height: ${isMobile ? 'auto' : '100%'};
              `}
            >
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
                        <Text
                          truncate
                          type="headline"
                          color="gray6"
                          width="130px"
                          bold
                        >
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

      <Col
        lg="6"
        css={`
          margin-bottom: ${isMobile ? '14px' : '0px'};
        `}
      >
        <FullHeightCard headerIcon="linechart" headerTitle="Rendimentos">
          <CardRow padding={isMobile ? '28px' : '28px 49px'}>
            <Text type="headline">
              Com base nos rendimentos históricos dos fundos que sugerimos, o
              gráfico apresenta uma estimativa de como seu dinheiro poderá
              evoluir até sua meta.
            </Text>
          </CardRow>
          <LineChart
            data={income}
            width="100%"
            height={isMobile ? '260px' : '220px'}
            colors={colorsLineChart}
            marker={answer.target_value}
          />
        </FullHeightCard>
      </Col>
    </GridRow>
  )
}

SectionOne.propTypes = {
  answer: PropTypes.object,
  combo: PropTypes.array,
  income: PropTypes.object,
}

SectionOne.defaultProps = {
  answer: {},
  combo: [],
  income: {},
}

export default SectionOne
