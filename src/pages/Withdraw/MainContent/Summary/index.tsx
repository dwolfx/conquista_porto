import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { formatMoney } from 'helpers'
import { GetWithdrawSummaryRequest } from 'store/modules/Withdraw/actions'

import { IBank } from 'store/modules/Withdraw/types'

import { Divisor } from '../styles'
import BankCards from './BankCards'
import * as s from './styles'

interface IProps {
  value: number
  bankSelected: string
  onBankSelectedChange: (bankId: string) => void
}

const Summary = ({ value, bankSelected, onBankSelectedChange }: IProps) => {
  const dispatch = useDispatch()

  const [settlementAccount, setSettlementAccount] = useState<
    IBank[] | undefined
  >(undefined)
  const { summaryInfos } = useSelector<any, any>(state => ({
    summaryInfos: state.withdraw,
  }))

  const getSummaryInfos = useCallback(() => {
    if (value !== summaryInfos.summaryData?.valor_operacao) {
      dispatch(
        GetWithdrawSummaryRequest({
          data: { valor_operacao: value },
        })
      )
    }
  }, [dispatch, value, summaryInfos.summaryData])

  useEffect(() => {
    getSummaryInfos()
  }, [getSummaryInfos])

  useEffect(() => {
    if (summaryInfos?.summaryData?.contas_liquidacao?.conta_liquidacao) {
      const newSettlementAccount = [
        summaryInfos.summaryData.contas_liquidacao.conta_liquidacao,
      ].flatMap(item => item)

      if (
        summaryInfos &&
        bankSelected.length === 0 &&
        newSettlementAccount &&
        newSettlementAccount[0].id_conta
      ) {
        onBankSelectedChange(newSettlementAccount[0].id_conta)
      }

      setSettlementAccount(newSettlementAccount)
    }
  }, [summaryInfos, onBankSelectedChange, bankSelected])

  return (
    <s.Container>
      <HorizontalList
        startItems={[
          <Text type="headline" color="gray6" bold>
            Solicitação
          </Text>,
        ]}
      />

      <Divisor />

      <HorizontalList
        startItems={[
          <Text type="headline" color="gray5">
            Valor solicitado
          </Text>,
        ]}
        endItems={[
          <Text type="headline" color="gray6" bold>
            {formatMoney(value)}
          </Text>,
        ]}
      />
      <HorizontalList
        startItems={[
          <Text type="headline" color="gray5">
            Data
          </Text>,
        ]}
        endItems={[
          <Text type="headline" color="gray6" bold>
            {moment().format('DD/MM/YYYY')}
          </Text>,
        ]}
      />

      <Divisor />

      <HorizontalList
        startItems={[
          <Text type="headline" color="gray6" bold>
            Selecione a conta para depósito
          </Text>,
        ]}
      />

      <Divisor />

      <s.BankCardsContainer>
        <BankCards
          bankInfos={settlementAccount}
          isLoading={summaryInfos.isLoadingSummary}
          hasError={summaryInfos.hasErrorSummary}
          onError={getSummaryInfos}
          bankSelected={bankSelected}
          onBankSelectedChange={onBankSelectedChange}
        />
      </s.BankCardsContainer>

      <s.InfosContainer>
        <Text color="gray6" bold>
          A transferência dos recursos é uma TED.
        </Text>
        <Text color="gray6" bold>
          Transferências no mesmo dia devem ser solicitadas até 17h.
        </Text>
        <Text color="gray6" bold>
          Caso não exista saldo disponível, a TED é cancelada.
        </Text>
      </s.InfosContainer>
    </s.Container>
  )
}

export default Summary
