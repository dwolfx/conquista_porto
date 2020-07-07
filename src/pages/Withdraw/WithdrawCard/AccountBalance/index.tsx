import React from 'react'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Loading from 'components/Loading'
import Icon from 'components/IconExporter'

import { formatMoney } from 'helpers'

import * as s from './styles'

interface IAccountBalance {
  accountBalanceValue?: number
  hasError: boolean
  isLoading: boolean
}

const AccountBalance = ({
  accountBalanceValue,
  hasError,
  isLoading,
  ...rest
}: IAccountBalance) => {
  const accountBalanceInfo = [
    <Text type="captionUppercase" bold color="gray4">
      Conta de investimento
    </Text>,
    <Text type="headline" bold color="gray6">
      {accountBalanceValue && formatMoney(accountBalanceValue)}
    </Text>,
    <Text type="caption" bold color="gray5">
      Saldo em conta
    </Text>,
  ]

  const renderLoading = () => (
    <s.Wrapper>
      <s.LoadingText type="headline" color="gray5">
        Buscando informações de saldo...
      </s.LoadingText>
      <Loading />
    </s.Wrapper>
  )

  const renderError = () => {
    return (
      <s.Wrapper>
        <s.ErrorText type="headline" color="magenta2">
          Não foi possível carregar o saldo. Por favor, tente novamente.
        </s.ErrorText>
        <Icon
          name="reload"
          color="blue4"
          css={`
            cursor: pointer;
          `}
          onClick={() => {}}
        />
      </s.Wrapper>
    )
  }

  const renderAccountBalance = () => {
    if (isLoading && !hasError) {
      return renderLoading()
    }

    if (hasError || (!accountBalanceValue && !isLoading)) {
      return renderError()
    }

    return (
      <s.Container>
        <VerticalList elements={accountBalanceInfo} {...rest} />
      </s.Container>
    )
  }

  return renderAccountBalance()
}

export default AccountBalance
