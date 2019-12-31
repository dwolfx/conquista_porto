/* eslint-disable react/no-array-index-key */
import React from 'react'

import { useSelector } from 'react-redux'

import ButtonLink from 'components/Button/Link'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import CreditHomeImg from 'assets/images/pages/Home/credit1.jpg'
import InsuranceHomeImg from 'assets/images/pages/Home/insurance1.jpg'
import PieChart from 'components/PieChart'
import Text from 'components/Text'
import { formatMoney } from 'helpers'

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
  ProductItem,
  ThreeItemsLine,
  ItemLine,
  ItemDivisor,
} from './styles'

export default function SectionOne() {
  const vehiclesFinancings = useSelector(state => state.vehicleFinancing.data)

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

    result = result.concat(vehiclesFinancings)

    if (result.length > 0) {
      return result.map((product, index) => (
        <>
          {index > 0 ? <ItemDivisor /> : null}
          <ProductItem>
            <Text type="title5">Financiamento de Veículo</Text>
            <Text type="title6">{product.Contrato}</Text>
            <ThreeItemsLine>
              <ItemLine padding="0 14px 0 0" width="100%">
                <MiniLinearProgressBar
                  atual={parseInt(product.QuantidadeParcelasPagas, 10)}
                  max={parseInt(product.QuantidadeParcelasContratadas, 10)}
                />
              </ItemLine>
              <ItemLine>
                <Text type="title5" bold>
                  {`${product.QuantidadeParcelasPagas}/${product.QuantidadeParcelasContratadas}`}
                </Text>
              </ItemLine>
              <ItemLine justifySelf="end" alignSelf="center">
                <ButtonLink>GERENCIAR</ButtonLink>
              </ItemLine>
            </ThreeItemsLine>
          </ProductItem>
        </>
      ))
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
              {renderCreditProducts()}
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
