import React from 'react'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Popover from 'components/Popover'
import Icon from 'components/IconExporter'
import { INewPrivateWelfare } from '../index'
import { formatMoney, handlePrivateWelfareRedirect } from 'helpers'

import { findBenefitById } from '../'

import {
  StyledCarousel,
  Wrapper,
  ContentWrapper,
  CategoryWrapper,
  ButtonWrapper,
  ManageButton,
  LabelText,
} from '../styles'

interface IPrivateWelfareMobile {
  privateWelfareList: INewPrivateWelfare[]
  headerEndItem: React.ReactNode
}
const PrivateWelfareMobile = ({
  privateWelfareList,
  headerEndItem,
}: IPrivateWelfareMobile) => (
  <StyledCarousel
    headerIcon="time"
    headerTitle="Previdência"
    headerEndItem={headerEndItem}
    arrayContent={
      privateWelfareList &&
      privateWelfareList.map((pV: INewPrivateWelfare, index: number) => (
        <Wrapper>
          <ContentWrapper key={index}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4" bold>
                  Produto
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {pV?.product?.productId === 2074 ||
                  pV?.product?.productId === 3074
                    ? `Porto Seguro ${
                        pV?.product?.productId === 2074 ? 'VGBL' : 'PGBL'
                      } Individual`
                    : ''}
                </Text>,
              ]}
            />
            <VerticalList
              elements={[
                <CategoryWrapper>
                  <LabelText>Saldo bruto</LabelText>
                  <Popover
                    data-testid="gross-balance-info"
                    tooltip
                    content={() => (
                      <Text type="body" color="white">
                        Valor disponível em conta, sem desconto de taxas e
                        impostos.
                      </Text>
                    )}
                  >
                    <Icon
                      name="information"
                      role="button"
                      aria-label="info-ballance"
                      color="blue4"
                      width={21}
                    />
                  </Popover>
                </CategoryWrapper>,
                <Text color="gray6" type="headline" bold>
                  {pV?.grossBalance
                    ? formatMoney(pV?.grossBalance)
                    : 'Pendente'}
                </Text>,
              ]}
            />
            <VerticalList
              elements={[
                <CategoryWrapper>
                  <LabelText>Contribuição mensal</LabelText>
                  <Popover
                    tooltip
                    content={() => (
                      <Text type="body" color="white">
                        Aplicação de um mesmo valor todos os meses.
                      </Text>
                    )}
                  >
                    <Icon
                      data-testid="monthly-contribution-info"
                      name="information"
                      role="button"
                      aria-label="info-contribution"
                      color="blue4"
                      width={21}
                    />
                  </Popover>
                </CategoryWrapper>,
                <Text color="gray6" type="headline" bold>
                  {findBenefitById(
                    pV.benefits.find(benefit => benefit.benefitId === '54')
                      ?.expectedContributionValue
                  )}
                </Text>,
              ]}
            />
            <VerticalList
              elements={[
                <CategoryWrapper>
                  <LabelText>Tributação</LabelText>
                  <Popover
                    tooltip
                    data-testid="tributes-info"
                    content={() => (
                      <Text type="body" color="white">
                        O valor do tributo a ser cobrado aumenta de acordo com a
                        renda.
                      </Text>
                    )}
                  >
                    <Icon
                      name="information"
                      role="button"
                      aria-label="info-tax"
                      color="blue4"
                      width={21}
                    />
                  </Popover>
                </CategoryWrapper>,
                <Text color="gray6" type="headline" bold>
                  {pV.taxOptionType === 'TP' ? 'Progressiva' : 'Regressiva'}
                </Text>,
              ]}
            />
          </ContentWrapper>
          <ButtonWrapper>
            <ManageButton
              onClick={() => handlePrivateWelfareRedirect()}
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="Gerenciar previdencia privada"
              data-gtm-name="botao gerenciar"
            >
              Gerenciar
            </ManageButton>
          </ButtonWrapper>
        </Wrapper>
      ))
    }
  />
)

export default PrivateWelfareMobile
