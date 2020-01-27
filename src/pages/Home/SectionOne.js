/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import ButtonLink from 'components/Button/Link'
import InvestmentEmptyImg from 'assets/images/pages/Home/img_investiments_empty.jpg'

import PieChart from 'components/PieChart'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { formatMoney } from 'helpers'
import ChartMiddleInfoContent from './ChartMiddleInfoContent'

import ProductItemGenerator from './ProductItemGenerator'

import {
  FullHeightCard,
  SectionCol,
  SectionRow,
  SliderBox,
  SliderImageBox,
  SliderCaption,
  SliderTextBox,
  SliderBoxButton,
  InvestmentInfos,
  InvestmentInfosRow,
  OverflowCard,
} from './styles'

const SectionOne = () => {
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing.data)
  const creditCards = useSelector(state => state.creditCard.data)
  const vehiclesConsortium = useSelector(state => state.consortiumVehicle.data)
  const buildingConsortium = useSelector(state => state.consortiumBuilding.data)

  const history = useHistory()

  const renderCreditProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(creditCards, 'cartaoCredito', history),
      ...ProductItemGenerator(
        vehiclesFinancings,
        'financiamentoVeiculo',
        history
      ),
      ...ProductItemGenerator(vehiclesConsortium, 'consorcioVeiculo', history),
      ...ProductItemGenerator(buildingConsortium, 'consorcioImovel', history),
    ]

    return formatResult(insertDivisor, sortArray)(result)
  }

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
          <InvestmentCard />
        </FullHeightCard>
      </SectionCol>

      <SectionCol lg="7">
        <SectionRow style={{ height: '100%' }}>
          <SectionCol lg="6">
            <FullHeightCard headerIcon="creditcard" headerTitle="Crédito">
              <OverflowCard>{renderCreditProducts()}</OverflowCard>
            </FullHeightCard>
          </SectionCol>

          <SectionCol lg="6">
            <FullHeightCard headerIcon="targetmarket" headerTitle="Seguros">
              <OverflowCard>
                <InsuranceCard />
              </OverflowCard>
            </FullHeightCard>
          </SectionCol>
        </SectionRow>
      </SectionCol>
    </>
  )
}

const graphValuesGenerator = (data, theme) => {
  const colorsPriority = [
    theme.colors.magenta2,
    theme.colors.blue4,
    theme.colors.yellow2,
    theme.colors.green3,
    theme.colors.darkBlue2,
  ]

  let result = []

  if (data.saldototal && data.categorias) {
    result = data.categorias.sort((a, b) => b.valor - a.valor)
    result = result.map((item, index) => ({
      id: `${index}`,
      label: item.nome,
      value: item.valor,
      color: colorsPriority[index],
      percent: ((item.valor / data.saldototal) * 100).toFixed(2),
    }))
  }

  return result
}

const InvestmentCard = () => {
  const consolidatedPosition = useSelector(
    state => state.consolidatedPosition.data
  )
  const bankData = useSelector(state => state.bankData.data)

  const history = useHistory()
  const [pieChartInfo, setPieChartInfo] = useState({
    id: -1,
    label: '',
    value: 0,
    percent: 0,
  })

  useEffect(() => {
    setPieChartInfo({
      value: (consolidatedPosition && consolidatedPosition.saldototal) || 0,
      percent: 0,
    })
  }, [consolidatedPosition])

  function settingPieChartInfo(payload) {
    setPieChartInfo(
      payload || {
        value: (consolidatedPosition && consolidatedPosition.saldototal) || 0,
        percent: 0,
      }
    )
  }

  const theme = useContext(ThemeContext)

  return consolidatedPosition ? (
    <SectionRow>
      <SectionCol lg="6">
        <PieChart
          width="100%"
          height="100%"
          data={graphValuesGenerator(consolidatedPosition, theme)}
          onMouseEnter={settingPieChartInfo}
          onSliceClick={settingPieChartInfo}
          onMouseLeave={settingPieChartInfo}
        >
          <ChartMiddleInfoContent pieChartInfo={pieChartInfo} />
        </PieChart>
      </SectionCol>

      <SectionCol lg="6" style={{ paddingTop: 51, paddingBottom: 51 }}>
        <InvestmentInfosRow>
          <InvestmentInfos>
            <Text type="headline">Saldo disponível</Text>
            <Text type="headline" bold>
              {formatMoney(
                bankData && bankData.DadosContaPortoSeguro
                  ? bankData.DadosContaPortoSeguro.saldo_disponivel
                  : 0
              )}
            </Text>
            <ButtonLink
              onClick={() => {
                history.push('/investimentos/visualizar')
              }}
            >
              Conta de Investimento
            </ButtonLink>
          </InvestmentInfos>
        </InvestmentInfosRow>
        <InvestmentInfosRow>
          <InvestmentInfos>
            <Text type="headline">Saldo a liquidar</Text>
            <Text type="headline" bold>
              {formatMoney(
                bankData && bankData.DadosContaPortoSeguro
                  ? bankData.DadosContaPortoSeguro.saldo_liquidar
                  : 0
              )}
            </Text>
            <ButtonLink onClick={() => history.push('/investimentos/extrato')}>
              Ver extrato
            </ButtonLink>
          </InvestmentInfos>
        </InvestmentInfosRow>
      </SectionCol>
    </SectionRow>
  ) : (
    <SliderBox>
      <SliderImageBox>
        <img src={InvestmentEmptyImg} alt="home offer pic" />
        <SliderCaption>
          <Text type="captionUppercase" bold>
            Fundos de Investimento
          </Text>
        </SliderCaption>
      </SliderImageBox>
      <SliderTextBox>
        <Text type="title" bold>
          Diversificando com menos riscos
        </Text>
        <Text>
          Uma carteira de investimento com diferentes ativos é a chave para bons
          rendimentos. Na Lista de Fundos, você pode selecionar o que mais
          combina com seu perfil.
        </Text>
        <SliderBoxButton
          color="secondary"
          onClick={() => history.push('/investimentos')}
        >
          CONHECER
        </SliderBoxButton>
      </SliderTextBox>
    </SliderBox>
  )
}

const InsuranceCard = () => {
  const lifeInsurance = useSelector(state => state.lifeInsurance.data)
  const tripInsurance = useSelector(state => state.tripInsurance.data)

  const history = useHistory()

  let result = []

  result = [
    ...ProductItemGenerator(lifeInsurance, 'seguroVida', history),
    ...ProductItemGenerator(tripInsurance, 'seguroViagem', history),
  ]

  return formatResult(insertDivisor, sortArray)(result)
}

const formatResult = (func1, func2) =>
  function(array) {
    return func1(func2(array))
  }

const insertDivisor = array => {
  const result = [...array]
  let spliceControl = 1

  for (let i = 1; i < array.length; i++) {
    result.splice(spliceControl, 0, <Divisor />)
    spliceControl += 2
  }

  return result
}

const sortArray = array =>
  array.sort((a, b) => {
    if (b.key.includes('empty')) {
      return -1
    }

    return 0
  })

export default SectionOne
