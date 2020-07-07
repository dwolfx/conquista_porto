import React from 'react'
import 'styled-components/macro'

import AccountBalance from './AccountBalance'

import * as s from './styles'

const WithdrawCard = () => {
  return (
    <s.Card>
      <AccountBalance
        accountBalanceValue={9785.0}
        hasError={false}
        isLoading={false}
      />
      <s.Divisor />
    </s.Card>
  )
}

export default WithdrawCard
