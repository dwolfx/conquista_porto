import React, { useEffect, useCallback } from 'react'
import 'styled-components/macro'
import { DefaultTheme } from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'

import Accordion from 'components/AccordionNew'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Button from 'components/Button'
import useMedia from 'hooks/useMedia'
import ErrorState from 'pages/Home/commons/ErrorState'
import { OpenBankExtractFundLayer } from 'store/modules/BankExtractFund/action'
import { GetLastTransactionDataRequest } from 'store/modules/Investment/LastTransaction/action'

import Table from './Table'
import List from './List'

import {
  Container,
  InfoContainer,
  TextAccordionHeader,
  LoadingStyled,
  TableContainer,
} from './styles'
import Text from 'components/Text'

const LastTransations = () => {
  const dispatch = useDispatch()
  const isTabletVerticalOrSmaller = useMedia('sm')
  const { lastTransaction, idFund } = useSelector(
    ({ lastTransaction, investmentPosition }: any) => ({
      lastTransaction,
      idFund: investmentPosition.idFund,
    })
  )

  const handleLastTransactionRequest = useCallback(() => {
    if (idFund) {
      dispatch(GetLastTransactionDataRequest(idFund))
    }
  }, [dispatch, idFund])

  useEffect(() => {
    handleLastTransactionRequest()
  }, [handleLastTransactionRequest])

  const renderContent = () => {
    if (lastTransaction?.isLoading) {
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
    if (lastTransaction?.hasError) {
      return (
        <InfoContainer>
          <ErrorState
            data-testid="lasttransations-error-component"
            onRetry={handleLastTransactionRequest}
          />
        </InfoContainer>
      )
    }
    const lastFiveTransactions = lastTransaction?.data
      ? lastTransaction?.data?.slice(0, 5)
      : []

    return (
      <Container>
        {isTabletVerticalOrSmaller ? (
          <div
            css={`
              text-align: center;
            `}
          >
            {lastFiveTransactions?.length < 1 ? (
              <Text
                type="headline"
                color="gray5"
                css={`
                  text-align: center;
                `}
              >
                Não existem movimentações nos últimos 30 dias.
              </Text>
            ) : (
              <List data={lastFiveTransactions} />
            )}
            <Button
              outline
              onClick={() => dispatch(OpenBankExtractFundLayer())}
            >
              ver extrato
            </Button>
          </div>
        ) : (
          <>
            {lastFiveTransactions?.length < 1 ? (
              <Text
                type="headline"
                color="gray5"
                css={`
                  text-align: center;
                `}
              >
                Não existem movimentações nos últimos 30 dias.
              </Text>
            ) : (
              <TableContainer>
                <Table data={lastFiveTransactions} />
              </TableContainer>
            )}
            <ButtonLink
              onClick={() => dispatch(OpenBankExtractFundLayer())}
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

  return (
    <Accordion
      openByDefault
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
