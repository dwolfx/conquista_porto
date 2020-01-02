import React from 'react'
import PropTypes from 'prop-types'

import ButtonLink from 'components/Button/Link'
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
} from './styles'

export default function SectionOne({ onRedirect }) {
  const renderEmptyState = () => (
    <EmptyBody>
      <EmptyText type="captionUppercase">Total investido</EmptyText>
      <EmptyText type="headline" bold>
        {formatMoney(0)}
      </EmptyText>
    </EmptyBody>
  )

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
                    O Cartão de Crédito que resolve e ainda dá vantagens e
                    benefícios da Porto Seguro para você, sua casa e seu carro.
                  </Text>
                  <SliderBoxButton
                    color="secondary"
                    onClick={() => onRedirect('/cartao-credito')}
                  >
                    CONHECER
                  </SliderBoxButton>
                </SliderTextBox>
              </SliderBox>
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
                    onClick={() => onRedirect('/seguro-vida')}
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

SectionOne.propTypes = {
  onRedirect: PropTypes.func.isRequired,
}
