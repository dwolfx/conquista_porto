import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import Popover from 'components/Popover'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import {
  IPrivateWelfare,
  IPrivateWelfareWithStatusPRE,
} from 'store/modules/PrivateWelfare/types'
import { formatMoney, handlePrivateWelfareRedirect } from 'helpers'

import PrivateWelfareEmptyState from './PrivateWelfareEmptyState'
import PrivateWelfareLoadingState from './PrivateWelfareLoadingState'
import PrivateWelfareErrorState from './PrivateWelfareErrorState'
import PrivateWelfareMobile from './PrivateWelfareMobile'
import { useSelector, useDispatch } from 'react-redux'
import {
  GetPrivateWelfareRequest,
  GetPrivateWelfareWithStatusPRERequest,
} from 'store/modules/PrivateWelfare/action'

import { HomePrivateWelfareCard } from '../styles'
import {
  ContentWrapper,
  ManageButton,
  ButtonWrapper,
  StyledCarousel,
  Wrapper,
} from './styles'
import useMedia from 'hooks/useMedia'

export const findBenefitById = (benefit: string | undefined) =>
  benefit ? formatMoney(benefit) : ''

export interface INewPrivateWelfare extends IPrivateWelfare {
  grossBalance: string
}

interface IProps {
  headerEndItem?: React.ReactNode
}

export default function PrivateWelfareSection({ headerEndItem }: IProps) {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')

  const [privateWelfareWithBalance, setPrivateWelfareWithBalance] = useState<
    INewPrivateWelfare[]
  >()

  const {
    privateWelfare,
    isLoading,
    hasError,
    isEmpty,
    privateWelfareWithStatusPRE,
    isLoadingStatusPRE,
  } = useSelector(
    (state: {
      privateWelfare: {
        data: IPrivateWelfare[]
        isLoading: boolean
        hasError: boolean
        isEmpty: boolean
        dataStatusPRE: IPrivateWelfareWithStatusPRE
        isLoadingStatusPRE: boolean
      }
    }) => ({
      privateWelfare: state.privateWelfare.data,
      isLoading: state.privateWelfare.isLoading,
      hasError: state.privateWelfare.hasError,
      isEmpty: state.privateWelfare.isEmpty,
      privateWelfareWithStatusPRE: state.privateWelfare.dataStatusPRE,
      isLoadingStatusPRE: state.privateWelfare.isLoadingStatusPRE,
    })
  )

  const getPrivateWelfareBalance = useCallback(() => {
    const newPrivateWelfareArray: INewPrivateWelfare[] = []

    privateWelfare.forEach((pV: IPrivateWelfare) => {
      const pvPREWithBalance = privateWelfareWithStatusPRE?.previdencia?.produtos?.produto?.find(
        (product: any) => {
          return product.certificado === String(pV.affiliationId)
        }
      )

      newPrivateWelfareArray.push({
        grossBalance: pvPREWithBalance?.coberturas?.cobertura[0]
          ?.valorsaldoatual
          ? pvPREWithBalance?.coberturas?.cobertura[0]?.valorsaldoatual
          : '',
        ...pV,
      })
    })

    setPrivateWelfareWithBalance(newPrivateWelfareArray)
  }, [privateWelfare, privateWelfareWithStatusPRE])

  useEffect(() => {
    if (privateWelfare && privateWelfareWithStatusPRE) {
      getPrivateWelfareBalance()
    }
  }, [privateWelfare, privateWelfareWithStatusPRE, getPrivateWelfareBalance])

  useEffect(() => {
    if (!privateWelfare) {
      dispatch(GetPrivateWelfareRequest())
    }
  }, [privateWelfare, dispatch])

  useEffect(() => {
    if (!privateWelfareWithStatusPRE) {
      dispatch(GetPrivateWelfareWithStatusPRERequest())
    }
  }, [privateWelfareWithStatusPRE, dispatch])

  const content = () => {
    if (isLoading || isLoadingStatusPRE) {
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
          <PrivateWelfareErrorState
            isLoading={isLoading || isLoadingStatusPRE}
          />
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

    if (isMobile && privateWelfareWithBalance) {
      return (
        <PrivateWelfareMobile
          privateWelfareList={privateWelfareWithBalance}
          headerEndItem={headerEndItem}
        />
      )
    }

    if (privateWelfareWithBalance) {
      return (
        <StyledCarousel
          headerIcon="time"
          headerTitle="Previdência"
          headerEndItem={headerEndItem}
          arrayContent={
            privateWelfareWithBalance &&
            privateWelfareWithBalance.map(
              (pV: INewPrivateWelfare, index: number) => (
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
                          {pV?.product?.productId === 2074 ||
                          pV?.product?.productId === 3074
                            ? `Porto Seguro ${
                                pV?.product?.productId === 2074
                                  ? 'VGBL'
                                  : 'PGBL'
                              } Individual`
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
                          {pV?.grossBalance
                            ? formatMoney(pV?.grossBalance)
                            : 'Pendente'}
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
                          {findBenefitById(
                            pV.benefits.find(
                              benefit => benefit.benefitId === '54'
                            )?.expectedContributionValue
                          )}
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
                              O valor do tributo a ser cobrado aumenta de acordo
                              com a renda.
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
                          {pV.taxOptionType === 'TP'
                            ? 'Progressiva'
                            : 'Regressiva'}
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
              )
            )
          }
        />
      )
    }
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

  return content()
}
