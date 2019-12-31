/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ButtonLink from 'components/Button/Link'
import CreditHomeImg from 'assets/images/pages/Home/credit1.jpg'
import InsuranceHomeImg from 'assets/images/pages/Home/insurance1.jpg'
import PieChart from 'components/PieChart'
import Text from 'components/Text'
import { formatMoney } from 'helpers'

import ProductItemGenerator from './ProductItemGenerator'

import {
  EmptyBody,
  EmptyText,
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
  ItemDivisor,
} from './styles'

const SectionOne = () => {
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing.data)
  const creditCards = useSelector(state => state.creditCard.data)
  const history = useHistory()

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText type="caption">Total investido</EmptyText>
      <EmptyText type="title5" bold>
        {formatMoney(0)}
      </EmptyText>
    </EmptyBody>
  )

  const renderCreditProducts = () => {
    let result = []

    result = result.concat(
      ProductItemGenerator(creditCards, 'cartaoCredito', history)
    )
    result = result.concat(<ItemDivisor />)
    result = result.concat(
      ProductItemGenerator(vehiclesFinancings, 'financiamentoVeiculo', history)
    )

    if (result.length > 0) {
      return result
    }

    return (
      <SliderBox>
        <SliderImageBox>
          <img src={CreditHomeImg} alt="home offer pic" />
          <SliderCaption>
            <Text type="caption" bold>
              Cartão de crédito
            </Text>
          </SliderCaption>
        </SliderImageBox>
        <SliderTextBox>
          <Text type="title5" bold>
            O cartão com mais benefícios
          </Text>
          <Text>
            Controle suas compras diretamente no aplicativo e acumule pontos
            para trocar por em serviços e produtos Porto Seguro.
          </Text>
          <SliderBoxButton color="secondary">Conheça</SliderBoxButton>
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
              <PieChart width="100%" height="100%">
                {renderEmptyState()}
              </PieChart>
            </SectionCol>

            <SectionCol lg="6" style={{ paddingTop: 51, paddingBottom: 51 }}>
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="title5">Saldo disponível</Text>
                  <Text type="title5" bold>
                    {formatMoney(0)}
                  </Text>
                  <ButtonLink>Conta de Investimento</ButtonLink>
                </InvestmentInfos>
              </InvestmentInfosRow>
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="title5">Saldo a liquidar</Text>
                  <Text type="title5" bold>
                    {formatMoney(0)}
                  </Text>
                  <ButtonLink>Ver extrato</ButtonLink>
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
              <SliderBox>
                <SliderImageBox>
                  <img src={InsuranceHomeImg} alt="home offer pic" />
                  <SliderCaption>
                    <Text type="caption" bold>
                      Seguro viagem
                    </Text>
                  </SliderCaption>
                </SliderImageBox>
                <SliderTextBox>
                  <Text type="title5" bold>
                    Leve a tranquilidade na mala
                  </Text>
                  <Text>
                    Escolha hoje as coberturas mais adequadas aos seus planos e
                    proteja-se contra imprevistos em viagens nacionais ou
                    internacionais.
                  </Text>
                  <SliderBoxButton color="secondary">Conheça</SliderBoxButton>
                </SliderTextBox>
              </SliderBox>
            </FullHeightCard>
          </SectionCol>
        </SectionRow>
      </SectionCol>
    </>
  )
}

export default SectionOne
