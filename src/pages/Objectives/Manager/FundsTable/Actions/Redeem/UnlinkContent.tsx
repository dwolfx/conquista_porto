import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import MoneyInput from 'components/Inputs/Money'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'

import { Currency, BRLCurrency } from 'helpers/money'
import useMedia from 'hooks/useMedia'

import { IUnlinkContent, TError } from './types'
import * as s from './styles'

export default function({
  value,
  setValue,
  fundInfo,
  setButtonIsDisabled,
}: IUnlinkContent) {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')

  const [innerValue, setInnerValue] = useState(value)
  const [error, setError] = useState<TError>(undefined)

  return (
    <>
      {isMobile ? (
        <VerticalList
          elements={[
            <Text type="headline" color="gray5">
              Valor no objetivo
            </Text>,
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fundInfo.invested, true)}
            </Text>,
          ]}
          css={`
            padding: 0;
          `}
        />
      ) : (
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray5">
              Valor no objetivo
            </Text>,
          ]}
          endItems={[
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fundInfo.invested, true)}
            </Text>,
          ]}
          noPadding
        />
      )}

      <s.Divisor />

      <Text
        type="headline"
        color="gray6"
        css={`
          margin-bottom: ${theme.spacing(3)}px;
        `}
      >
        Quanto você deseja desvincular deste objetivo?
      </Text>

      <MoneyInput
        error={error}
        value={Currency.parse(innerValue)}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const targetValue = new BRLCurrency(target.value).toNumber()

          if (targetValue > fundInfo.invested) {
            setError({
              icon: 'alertrounded',
              message: 'Valor acima do disponível',
            })
            setButtonIsDisabled(true)
          } else {
            setError(undefined)
            setButtonIsDisabled(false)
          }
          setInnerValue(targetValue)
        }}
        onBlur={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const targetValue = new BRLCurrency(target.value).toNumber()

          setValue(targetValue)
        }}
      />
    </>
  )
}
