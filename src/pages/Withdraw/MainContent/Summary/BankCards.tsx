import React from 'react'
import { Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import Loading from 'components/Loading'
import Radio from 'components/Inputs/Radio'
import Text from 'components/Text'

import { IBank } from 'store/modules/Withdraw/types'

import * as s from './styles'

interface IBankCards {
  bankSelected: string
  bankInfos: IBank[] | undefined
  isLoading: boolean
  hasError: boolean
  onError: () => void
  onBankSelectedChange: (bankId: string) => void
}

const BankCards = ({
  bankInfos,
  bankSelected,
  isLoading,
  hasError,
  onError,
  onBankSelectedChange,
}: IBankCards) => {
  if (isLoading) {
    return (
      <s.LoadingCol md={6} mdOffset={3}>
        <Loading type="bar" legend="Buscando informações da sua conta..." />
      </s.LoadingCol>
    )
  }

  if (hasError) {
    return (
      <s.ErrorCol md={6} mdOffset={3}>
        <Text color="magenta2" type="headline">
          Não foi possível carregar suas informações.
        </Text>
        <Button onClick={onError}>Tentar novamente.</Button>
      </s.ErrorCol>
    )
  }

  return (
    <>
      {bankInfos?.map(bank => (
        <Col
          lg={4}
          md={6}
          sm={6}
          onClick={() => onBankSelectedChange(bank.id_conta)}
          key={`banco-${bank.id_conta}`}
        >
          <s.BankCard isChecked={bankSelected === bank.id_conta}>
            <Text type="title" color="gray6" bold>
              {bank.nome_banco.replace('Banco ', '')}
            </Text>
            <Text type="title" color="gray5" bold>
              Conta Corrente {bank.conta}-{bank.digito_conta}
            </Text>
            <Text type="title" color="gray5" bold>
              Agência {bank.agencia}
            </Text>

            <s.RadioInputContainer>
              <Radio
                checkedItem={bankSelected}
                options={[{ name: 'bank-selected', value: bank.id_conta }]}
                onChange={() => onBankSelectedChange(bank.id_conta)}
                showLabel={false}
              />
            </s.RadioInputContainer>
          </s.BankCard>
        </Col>
      ))}
    </>
  )
}

export default BankCards
