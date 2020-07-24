import React, { useEffect, useCallback } from 'react'
import 'styled-components/macro'
import { DefaultTheme } from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { GetBankExtractFundRequest } from 'store/modules/BankExtractFund/action'

import useMedia from 'hooks/useMedia'

import ErrorState from 'pages/Home/commons/ErrorState'

import Accordion from 'components/AccordionNew'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Button from 'components/Button'

import Table from './Table'
import List from './List'

import {
  Container,
  InfoContainer,
  TextAccordionHeader,
  LoadingStyled,
  TableContainer,
} from './styles'

const LastTransations = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isTabletVerticalOrSmaller = useMedia('sm')
  const { auth, bankExtractFund, investmentPosition } = useSelector(
    ({ auth, bankExtractFund, investmentPosition }: any) => ({
      auth,
      bankExtractFund,
      investmentPosition,
    })
  )

  const handleBankExtractFundRequest = useCallback(() => {
    if (investmentPosition.idFund) {
      dispatch(
        GetBankExtractFundRequest(
          {
            idFundo: investmentPosition.idFund,
            tipoFiltro: 30,
          },
          auth.cpf
        )
      )
    }
  }, [dispatch, auth.cpf, investmentPosition.idFund])

  useEffect(() => {
    handleBankExtractFundRequest()
  }, [handleBankExtractFundRequest])

  const renderContent = () => {
    if (bankExtractFund.isLoading || investmentPosition.isLoading) {
      return (
        <InfoContainer>
          <LoadingStyled
            data-testid="lasttransations-loading-component"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </InfoContainer>
      )
    }
    if (bankExtractFund.hasError) {
      return (
        <InfoContainer>
          <ErrorState
            data-testid="lasttransations-error-component"
            onRetry={handleBankExtractFundRequest}
          />
        </InfoContainer>
      )
    }

    let lastFiveTransactions = []

    if (
      bankExtractFund.data[0] &&
      typeof bankExtractFund.data[0].operacoes !== 'string'
    ) {
      if (
        bankExtractFund.data[0] &&
        Array.isArray(bankExtractFund.data[0].operacoes.operacao)
      ) {
        lastFiveTransactions = bankExtractFund.data[0].operacoes.operacao.slice(
          0,
          5
        )
      } else {
        lastFiveTransactions = [
          { ...bankExtractFund.data[0].operacoes.operacao },
        ]
      }
    }

    return (
      <Container>
        {isTabletVerticalOrSmaller ? (
          <div
            css={`
              text-align: center;
            `}
          >
            <List data={lastFiveTransactions} />
            <Button
              outline
              onClick={() => {
                history.push(
                  `/investimentos/extrato?idFundo=${investmentPosition.idFund}`
                )
              }}
            >
              ver extrato
            </Button>
          </div>
        ) : (
          <>
            <TableContainer>
              <Table data={lastFiveTransactions} />
            </TableContainer>
            <ButtonLink
              onClick={() => {
                history.push(
                  `/investimentos/extrato?idFundo=${investmentPosition.idFund}`
                )
              }}
              css={`
                margin-top: ${({ theme }: { theme: DefaultTheme }) =>
                  theme.spacing(4)}px;
              `}
            >
              ver extrato
            </ButtonLink>
          </>
        )}
      </Container>
    )
  }

  if (
    bankExtractFund.data[0] &&
    typeof bankExtractFund.data[0].operacoes === 'string'
  ) {
    return <noscript />
  }

  return (
    <Accordion
      titleNode={
        <TextAccordionHeader>Últimas Movimentações</TextAccordionHeader>
      }
      triggerCloseOnArrow
    >
      <Divisor />
      {renderContent()}
    </Accordion>
  )
}

export default LastTransations
