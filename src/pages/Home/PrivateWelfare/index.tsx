import React, { useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import Popover from 'components/Popover'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import { IPrivateWelfare } from 'store/modules/PrivateWelfare/types'
import {
  formatMoney,
  truncateString,
  handlePrivateWelfareRedirect,
} from 'helpers'

import PrivateWelfareEmptyState from './PrivateWelfareEmptyState'
import PrivateWelfareLoadingState from './PrivateWelfareLoadingState'
import PrivateWelfareErrorState from './PrivateWelfareErrorState'
import PrivateWelfareMobile from './PrivateWelfareMobile'
import { useSelector, useDispatch } from 'react-redux'
import { GetPrivateWelfareRequest } from 'store/modules/PrivateWelfare/action'

import { HomePrivateWelfareCard } from '../styles'
import {
  ContentWrapper,
  ManageButton,
  ButtonWrapper,
  StyledCarousel,
  Wrapper,
} from './styles'
import useMedia from 'hooks/useMedia'
interface IProps {
  headerEndItem?: React.ReactNode
}

export default function PrivateWelfareSection({ headerEndItem }: IProps) {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const isDesktop = useMedia('lgUp')
  const isTabletHorizontal = useMedia('mdUp')
  const isTabletVertical = useMedia('md')
  const isMobile = useMedia('sm')
  const { privateWelfare, isLoading, hasError, cpf, isEmpty } = useSelector(
    (state: any) => ({
      cpf: state.auth.cpf,
      privateWelfare: state.privateWelfare.data,
      isLoading: state.privateWelfare.isLoading,
      hasError: state.privateWelfare.hasError,
      isEmpty: state.privateWelfare.isEmpty,
    })
  )

  useEffect(() => {
    if (!privateWelfare && cpf) {
      dispatch(GetPrivateWelfareRequest(cpf))
    }
  }, [privateWelfare, cpf, dispatch])

  const truncateName = (name: string) => {
    if (isTabletVertical) {
      return name
    }
    if (isDesktop) {
      return truncateString(name, 25)
    }
    if (isTabletHorizontal) {
      return truncateString(name, 30)
    }
  }

  const content = () => {
    if (isLoading) {
      return (
        <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={headerEndItem}
        >
          <PrivateWelfareLoadingState data-testid="private-welfare-loading-state" />
        </HomePrivateWelfareCard>
      )
    }

    if (hasError) {
      return (
        <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={headerEndItem}
        >
          <PrivateWelfareErrorState isLoading={isLoading} cpf={cpf} />
        </HomePrivateWelfareCard>
      )
    }

    if (isEmpty) {
      return (
        <HomePrivateWelfareCard
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={headerEndItem}
        >
          <PrivateWelfareEmptyState />
        </HomePrivateWelfareCard>
      )
    }

    if (isMobile) {
      return (
        <PrivateWelfareMobile
          privateWelfareList={privateWelfare}
          headerEndItem={headerEndItem}
        />
      )
    }

    return (
      <StyledCarousel
        headerIcon="time"
        headerTitle="Previdência"
        headerEndItem={headerEndItem}
        arrayContent={
          privateWelfare &&
          privateWelfare.map((pV: IPrivateWelfare, index: number) => (
            <Wrapper>
              <ContentWrapper key={index}>
                <HorizontalList
                  startItems={[
                    <Text type="headline" color="gray5">
                      Produto
                    </Text>,
                  ]}
                  endItems={[
                    <Text bold type="headline" color="gray6">
                      {pV?.benefits[0]?.reserves?.funds[0]?.fundName
                        ? truncateName(
                            pV?.benefits[0]?.reserves?.funds[0]?.fundName
                          )
                        : ''}
                    </Text>,
                  ]}
                />
                <HorizontalList
                  startItems={[
                    <Text type="headline" color="gray5">
                      Saldo bruto
                    </Text>,
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
                    </Popover>,
                  ]}
                  endItems={[
                    <Text bold type="headline" color="gray6">
                      mock
                    </Text>,
                  ]}
                />
                <HorizontalList
                  startItems={[
                    <Text type="headline" color="gray5">
                      Contribuição mensal
                    </Text>,
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
                    </Popover>,
                  ]}
                  endItems={[
                    <Text bold type="headline" color="gray6">
                      {formatMoney(pV?.benefits[0]?.expectedContributionValue)}
                    </Text>,
                  ]}
                />
                <HorizontalList
                  startItems={[
                    <Text type="headline" color="gray5">
                      Tributação
                    </Text>,
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
                    </Popover>,
                  ]}
                  endItems={[
                    <Text bold type="headline" color="gray6">
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

  return content()
}
