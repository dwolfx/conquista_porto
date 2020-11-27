import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Popover from 'components/Popover'
import Icon from 'components/IconExporter'
import { IPrivateWelfare } from 'store/modules/PrivateWelfare/types'
import {
  formatMoney,
  truncateString,
  handlePrivateWelfareRedirect,
} from 'helpers'

import {
  StyledCarousel,
  Wrapper,
  ContentWrapper,
  CategoryWrapper,
  ButtonWrapper,
  ManageButton,
} from '../styles'

interface IProps {
  privateWelfareList: IPrivateWelfare[]
  headerEndItem: React.ReactNode
}
const PrivateWelfareMobile = ({
  privateWelfareList,
  headerEndItem,
}: IProps) => {
  const theme = useContext(ThemeContext)
  return (
    <StyledCarousel
      headerIcon="time"
      headerTitle="Previdência"
      headerEndItem={headerEndItem}
      arrayContent={
        privateWelfareList &&
        privateWelfareList.map((pV: IPrivateWelfare, index: number) => (
          <Wrapper>
            <ContentWrapper key={index}>
              <VerticalList
                elements={[
                  <Text type="captionUppercase" color="gray4" bold>
                    Produto
                  </Text>,
                  <Text type="headline" color="gray6" bold>
                    {truncateString(
                      pV?.benefits[0]?.reserves?.funds[0]?.fundName
                        ? pV?.benefits[0]?.reserves?.funds[0]?.fundName
                        : '',
                      30
                    )}
                  </Text>,
                ]}
              />
              <VerticalList
                elements={[
                  <CategoryWrapper>
                    <Text type="captionUppercase" color="gray4" bold>
                      Saldo bruto
                    </Text>
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
                        fill={theme.colors.blue4}
                        width={21}
                      />
                    </Popover>
                  </CategoryWrapper>,
                  <Text color="gray6" type="headline" bold>
                    mock
                  </Text>,
                ]}
              />
              <VerticalList
                elements={[
                  <CategoryWrapper>
                    <Text type="captionUppercase" color="gray4" bold>
                      Contribuição mensal
                    </Text>
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
                        fill={theme.colors.blue4}
                        width={21}
                      />
                    </Popover>
                  </CategoryWrapper>,
                  <Text color="gray6" type="headline" bold>
                    {formatMoney(pV?.benefits[0]?.expectedContributionValue)}
                  </Text>,
                ]}
              />
              <VerticalList
                elements={[
                  <CategoryWrapper>
                    <Text type="captionUppercase" color="gray4" bold>
                      Tributação
                    </Text>
                    <Popover
                      tooltip
                      data-testid="tributes-info"
                      content={() => (
                        <Text type="body" color="white">
                          O valor do tributo a ser cobrado aumenta de acordo com
                          a renda.
                        </Text>
                      )}
                    >
                      <Icon
                        name="information"
                        role="button"
                        aria-label="info-tax"
                        fill={theme.colors.blue4}
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
}

export default PrivateWelfareMobile
