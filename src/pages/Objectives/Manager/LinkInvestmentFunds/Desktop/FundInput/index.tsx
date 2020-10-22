import React, { useRef, useState } from 'react'
import { BRLCurrency } from 'helpers/money'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import { ILinkableFunds } from '../../types'
import * as S from './styles'

export default function FundsInput({ fund }: { fund: ILinkableFunds }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hasError, setError] = useState(false)

  function onChange() {
    const inputAsCurrency = new BRLCurrency(inputRef.current?.value || '0,00')
    setError(fund.available < inputAsCurrency.toNumber())
  }

  return (
    <Popover
      turnOff={!hasError}
      tooltip
      content={
        hasError && (
          <Text type="body" color="white">
            Valor acima do disponivel
          </Text>
        )
      }
    >
      <S.Input
        ref={inputRef}
        data-fundid={fund.fund_id}
        placeholder="0,00"
        onChange={onChange}
        error={hasError}
        suffix={hasError && <Icon name="alertrounded" color="magenta2" />}
      />
    </Popover>
  )
}
