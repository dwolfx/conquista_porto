import React, { useEffect, useCallback } from 'react'
import 'styled-components/macro'
import { DefaultTheme } from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { GetBankExtractFundRequest } from 'store/modules/BankExtractFund/action'

import ErrorState from 'pages/Home/commons/ErrorState'
import LoadingState from 'pages/Home/commons/LoadingState'

import Accordion from 'components/AccordionNew'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'

import Table from './Table'

import { Container } from './styles'

const LastTransations = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth, bankExtractFund, investmentPosition } = useSelector(
    ({ auth, bankExtractFund, investmentPosition }: any) => ({
      auth,
      bankExtractFund,
      investmentPosition,
    })
  )

  const handleBankExtractFundRequest = useCallback(() => {
    // este ternário existe apenas enquanto aguardamos a definição da estória que define o fundo selecionado inicialmente
    // vai ser removido
    dispatch(
      GetBankExtractFundRequest(
        { idFundo: investmentPosition.idFund ? investmentPosition.idFund : 1 },
        auth.cpf
      )
    )
  }, [dispatch, auth.cpf, investmentPosition.idFund])

  useEffect(() => {
    handleBankExtractFundRequest()
  }, [handleBankExtractFundRequest])

  const renderContent = () => {
    if (bankExtractFund.isLoading) {
      return (
        <Container>
          <LoadingState data-testid="lasttransations-loading-component" />
        </Container>
      )
    }
    if (bankExtractFund.hasError) {
      return (
        <Container>
          <ErrorState
            data-testid="lasttransations-error-component"
            onRetry={handleBankExtractFundRequest}
          />
        </Container>
      )
    }
    return (
      <div
        css={`
          padding: ${({ theme }: { theme: DefaultTheme }) =>
            `${theme.spacing(3)}px ${theme.spacing(0)}px
            ${theme.spacing(0)}px ${theme.spacing(2)}px`};
        `}
      >
        <Container>
          <Table
            data={
              bankExtractFund.data[0]
                ? bankExtractFund.data[0].operacoes.operacao
                : []
            }
          />
        </Container>
        <ButtonLink
          onClick={() => {
            history.push(
              `/investimentos/extrato?idFundo=${investmentPosition.idFund}`
            )
          }}
          css={`
            padding-top: ${({ theme }: { theme: DefaultTheme }) =>
              theme.spacing(4)}px;
          `}
        >
          ver extrato
        </ButtonLink>
      </div>
    )
  }

  return (
    <Accordion
      titleNode="Últimas Movimentações"
      openByDefault
      triggerCloseOnArrow
    >
      <Divisor />
      {renderContent()}
    </Accordion>
  )
}

export default LastTransations
