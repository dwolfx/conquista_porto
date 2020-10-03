import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import MoneyInput from 'components/Inputs/Money'
import Text from 'components/Text'

import { Currency } from 'helpers/money'

import { IUnlinkContent } from './types'
import * as s from './styles'

export default function({ value: { value }, setValue }: IUnlinkContent) {
  const theme = useContext(ThemeContext)

  return (
    <>
      <HorizontalList
        startItems={[
          <Text type="headline" color="gray5">
            Valor no objetivo
          </Text>,
        ]}
        endItems={[
          <Text type="headline" color="gray6" bold>
            {Currency.parse(1500, true)}
          </Text>,
        ]}
        noPadding
      />

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
        value={Currency.parse(value || 0)}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setValue(currentValue => ({
            ...currentValue,
            value: +target.value,
          }))
        }
      />
    </>
  )
}
