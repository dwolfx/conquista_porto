/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

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
  const vehiclesConsortium = useSelector(state => state.consortiumVehicle.data)

  const history = useHistory()

  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText type="captionUppercase">Total investido</EmptyText>
      <EmptyText type="headline" bold>
        {formatMoney(0)}
      </EmptyText>
    </EmptyBody>
  )
  const theme = useContext(ThemeContext)

  const initialState = [
    {
      id: 'rendafixa',
      label: 'Porto Seguro Renda Fixa',
      value: 10,
      color: theme.colors.magenta2,
    },
    {
      id: 'multimercado',
      label: 'Porto Seguro Multimercado',
      value: 30,
      color: theme.colors.blue4,
    },
    {
      id: 'acoes',
      label: 'Porto Seguro Ações',
      value: 15,
      color: theme.colors.yellow2,
    },
    {
      id: 'creditocorporativo',
      label: 'Porto Seguro Crédito Corporativo',
      value: 25,
      color: theme.colors.green4,
    },
    {
      id: 'fundosimobiliarios',
      label: 'Porto Seguro Fundos Imobiliários',
      value: 20,
      color: theme.colors.darkBlue2,
    },
  ]

  const renderCreditProducts = () => {
    let result = []

    result = creditCards.length
      ? [...ProductItemGenerator(creditCards, 'cartaoCredito', history)]
      : result

    result = vehiclesFinancings.length
      ? [
          ...result,
          <ItemDivisor />,
          ...ProductItemGenerator(
            vehiclesFinancings,
            'financiamentoVeiculo',
            history
          ),
        ]
      : result

    result = vehiclesConsortium.length
      ? [
          ...result,
          <ItemDivisor />,
          ...ProductItemGenerator(
            vehiclesConsortium,
            'consorcioVeiculo',
            history
          ),
        ]
      : result
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

  return (
    <>
      <SectionCol lg="5">
        <FullHeightCard headerIcon="financial" headerTitle="Investimentos">
          <SectionRow>
            <SectionCol lg="6">
              <PieChart width="100%" height="100%" data={initialState}>
                {renderEmptyState()}
              </PieChart>
            </SectionCol>

            <SectionCol lg="6" style={{ paddingTop: 51, paddingBottom: 51 }}>
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="headline">Saldo disponível</Text>
                  <Text type="headline" bold>
                    {formatMoney(0)}
                  </Text>
                  <ButtonLink>Conta de Investimento</ButtonLink>
                </InvestmentInfos>
              </InvestmentInfosRow>
              <InvestmentInfosRow>
                <InvestmentInfos>
                  <Text type="headline">Saldo a liquidar</Text>
                  <Text type="headline" bold>
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
                    Planeje a sua proteção ou da sua família e tenha
                    tranquilidade para enfrentar adversidades e ainda conte com
                    muitos benefícios.
                  </Text>
                  <SliderBoxButton
                    color="secondary"
                    onClick={() => history.push('/seguro-vida')}
                  >
                    CONHECER
                  </SliderBoxButton>
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
