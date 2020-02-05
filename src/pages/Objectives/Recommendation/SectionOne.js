import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'

import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import InsuranceHomeImg from 'assets/images/pages/Home/insurance1.jpg'
import Text from 'components/Text'
import PieChart from 'components/PieChart'
import HorizontalList from 'components/HorizontalList'
import { formatMoney } from 'helpers'

import {
  GridRow,
  SliderBox,
  SliderImageBox,
  SliderTextBox,
  FullHeightCard,
  SectionRow,
  SectionCol,
  SuggestedProduct,
  PieChartContainer,
  PieChartChildrenContainer,
} from './styles'

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

      <Col lg="3">
        <FullHeightCard headerIcon="linechart" headerTitle="Rendimentos">
          <div style={{ width: 300, height: 300 }}>
            <ResponsiveBar
              data={graphValuesGenerator()}
              colors={({ data }) => data.color}
              padding={0.9}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              axisLeft={null}
              enableLabel={false}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 113,
                  translateY: 4,
                  itemWidth: 95,
                  itemHeight: 42,
                  itemsSpacing: 0,
                  symbolSize: 17,
                  itemDirection: 'left-to-right',
                },
              ]}
              isInteractive={false}
              animate={false}
            />
          </div>
        </FullHeightCard>
      </Col>

      <Col lg="3">
        <FullHeightCard headerIcon="information" headerTitle="Por que?">
          <SliderBox>
            <SliderImageBox>
              <img src={InsuranceHomeImg} alt="home offer pic" />
            </SliderImageBox>
            <SliderTextBox>
              <Text color="gray5">
                Planeje a sua proteção ou da sua família e tenha tranquilidade
                para enfrentar adversidades e ainda conte com muitos benefícios.
              </Text>
            </SliderTextBox>
          </SliderBox>
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
