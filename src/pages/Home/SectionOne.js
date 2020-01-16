/* eslint-disable react/no-array-index-key */
import React, { useContext, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import ButtonLink from 'components/Button/Link'
import CreditHomeImg from 'assets/images/pages/Home/credit1.jpg'
import InsuranceHomeImg from 'assets/images/pages/Home/insurance1.jpg'
import PieChart from 'components/PieChart'
import Text from 'components/Text'
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
  const lifeInsurance = useSelector(state => state.lifeInsurance.data)
  const tripInsurance = useSelector(state => state.tripInsurance.data)
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
      value: consolidatedPosition.saldototal || 0,
      percent: 0,
    })
  }, [consolidatedPosition])

  const theme = useContext(ThemeContext)

  const graphValuesGenerator = data => {
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

  const renderCreditProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(creditCards, 'cartaoCredito', history, false),
      ...ProductItemGenerator(
        vehiclesFinancings,
        'financiamentoVeiculo',
        history,
        true
      ),
      ...ProductItemGenerator(
        vehiclesConsortium,
        'consorcioVeiculo',
        history,
        true
      ),
      ...ProductItemGenerator(
        buildingConsortium,
        'consorcioImovel',
        history,
        true
      ),
    ]

    if (result.length > 0) {
      return result
    }

    return (
      <SliderBox>
        <SliderImageBox>
          <img src={CreditHomeImg} alt="home offer pic" />
          <SliderCaption>
            <Text type="captionUppercase" bold>
              Cartão de crédito
            </Text>
          </SliderCaption>
        </SliderImageBox>
        <SliderTextBox>
          <Text type="title" bold>
            O cartão com mais benefícios
          </Text>
          <Text>
            O Cartão de Crédito que resolve e ainda dá vantagens e benefícios da
            Porto Seguro para você, sua casa e seu carro.
          </Text>
          <SliderBoxButton
            color="secondary"
            onClick={() => history.push('/cartao-credito')}
          >
            CONHECER
          </SliderBoxButton>
        </SliderTextBox>
      </SliderBox>
    )
  }

  const renderInsuranceProducts = () => {
    let result = []

    result = [
      ...ProductItemGenerator(lifeInsurance, 'seguroVida', history, false),
      ...ProductItemGenerator(tripInsurance, 'seguroViagem', history, true),
    ]

    if (result.length > 0) {
      return result
    }

    return (
      <SliderBox>
        <SliderImageBox>
          <img src={InsuranceHomeImg} alt="home offer pic" />
          <SliderCaption>
            <Text type="captionUppercase" bold>
              Seguro de vida
            </Text>
          </SliderCaption>
        </SliderImageBox>
        <SliderTextBox>
          <Text type="title" bold>
            Suporte em todos os momentos
          </Text>
          <Text>
            Planeje a sua proteção ou da sua família e tenha tranquilidade para
            enfrentar adversidades e ainda conte com muitos benefícios.
          </Text>
          <SliderBoxButton
            color="secondary"
            onClick={() => history.push('/seguro-vida')}
          >
            CONHECER
          </SliderBoxButton>
        </SliderTextBox>
      </SliderBox>
    )
  }

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
          <SectionRow>
            <SectionCol lg="6">
              <PieChart
                width="100%"
                height="100%"
                data={graphValuesGenerator(consolidatedPosition)}
                onMouseEnter={setPieChartInfo}
                onMouseLeave={() =>
                  setPieChartInfo({
                    id: -1,
                    value: consolidatedPosition.saldototal || 0,
                  })
                }
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
                      bankData.DadosContaPortoSeguro
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
                      bankData.DadosContaPortoSeguro
                        ? bankData.DadosContaPortoSeguro.saldo_liquidar
                        : 0
                    )}
                  </Text>
                  <ButtonLink
                    onClick={() => history.push('/investimentos/extrato')}
                  >
                    Ver extrato
                  </ButtonLink>
                </InvestmentInfos>
              </InvestmentInfosRow>
            </SectionCol>
          </SectionRow>
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
              <OverflowCard>{renderInsuranceProducts()}</OverflowCard>
            </FullHeightCard>
          </SectionCol>
        </SectionRow>
      </SectionCol>
    </>
  )
}

export default SectionOne
