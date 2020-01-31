import React, { useContext, useState } from 'react'
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

const SectionOne = () => {
  const theme = useContext(ThemeContext)
  const [pieChartInfoChildren, setPieChartInfoChildren] = useState(null)

  const apiResponse = {
    goal: {
      nickname: 'Disney',
      targetDate: '2019-12-30',
      targetValue: 1,
      initialValue: 0,
      monthlyValue: 0,
      wouldLikeToReceiveBeforeFinalDate: false,
      wouldLikeToReceiveMonthlyIncome: false,
      goalType: 1,
      easyToSavePlannedAmount: false,
      targetDateFlexible: false,
    },
    combo: [
      {
        title: 'Investimentos',
        values: {
          'Investimento Mensal': 'R$ 80.000,00',
          'Investimento Inicial': 'R$ 920.000,00',
        },
        totalValue: 70000,
      },
      {
        title: 'Financiamento de Veículo',
        values: {
          'Valor a Contratar': 'R$ 69.999,00',
        },
        totalValue: 69999,
      },
    ],
    income: {
      pessimistic: 66500,
      medium: 70000,
      optimistic: 73500,
    },
    funds: [
      {
        name: 'Kapitalo Kappa FIN FIQ FIM',
        profitability: {
          '12': 8.13,
        },
        quotationApplyDays: 0,
        financialApplyDays: 0,
        quotationRescueDays: 0,
        financialRescueDays: 0,
        initialValue: 450000,
        monthlyValue: 30000,
      },
      {
        name: 'Porto Seguro DI Crédito Privado',
        profitability: {
          '12': 7.7,
        },
        quotationApplyDays: 0,
        financialApplyDays: 0,
        quotationRescueDays: 0,
        financialRescueDays: 0,
        initialValue: 222500,
        monthlyValue: 20000,
      },
      {
        name: 'Porto Seguro Soberano Referenciado DI',
        profitability: {
          '12': 7.13,
        },
        quotationApplyDays: 0,
        financialApplyDays: 0,
        quotationRescueDays: 0,
        financialRescueDays: 0,
        initialValue: 127500,
        monthlyValue: 15000,
      },
      {
        name: 'BTG Pactual Tesouro IPCA Longo FI RF REF',
        profitability: {
          '12': 6.11,
        },
        quotationApplyDays: 0,
        financialApplyDays: 0,
        quotationRescueDays: 0,
        financialRescueDays: 0,
        initialValue: 80000,
        monthlyValue: 10000,
      },
      {
        name: 'Capitânia Top Crédito Privado FIC FIRF',
        profitability: {
          '12': 5.12,
        },
        quotationApplyDays: 0,
        financialApplyDays: 0,
        quotationRescueDays: 0,
        financialRescueDays: 0,
        initialValue: 40000,
        monthlyValue: 5000,
      },
    ],
    creditProduct: {
      name: 'Financiamento de Veículo',
      values: [
        {
          name: 'Valor a Contratar',
          value: 'R$ 69.999,00',
          checked: false,
        },
      ],
    },
    additional: {
      travelSecurity: true,
      lifeSecurity: false,
      creditCard: false,
    },
  }

  const graphValuesGenerator = () => {
    const colorsPriority = [theme.colors.magenta2, theme.colors.blue4].reverse()
    const sortedData = [...apiResponse.combo].sort(
      (a, b) => a.totalValue - b.totalValue
    )

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
          : formatMoney(apiResponse.goal.targetValue)}
      </Text>
    </>
  )

  function settingPieChartInfoChildren(payload) {
    setPieChartInfoChildren(payload)
  }

  return (
    <GridRow height="430px">
      <Col lg="6">
        <FullHeightCard headerIcon="piechart" headerTitle="Combo">
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
              {apiResponse.combo.map(item => (
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

export default SectionOne
