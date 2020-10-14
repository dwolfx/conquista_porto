import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Text from 'components/Text'

import { IRedeemContent } from './types'
import { Checkbox } from './styles'

export default function({ options, setOptions }: IRedeemContent) {
  const theme = useContext(ThemeContext)
  return (
    <>
      <Text
        color="gray6"
        css={`
          margin-bottom: ${theme.spacing(3)}px;
        `}
      >
        Por favor, aponte, abaixo, o motivo pelo qual deseja resgatar valores
        deste fundo:
      </Text>

      {options.map(option => (
        <Checkbox
          id={option.id}
          checked={option.checked}
          onChange={() =>
            setOptions(currentOptions => {
              const newOptions = [...currentOptions].map(item =>
                item.id === option.id
                  ? { ...item, checked: !item.checked }
                  : item
              )

              return [...newOptions]
            })
          }
          label={
            <Text color="gray5" bold>
              {option.label}
            </Text>
          }
          key={`redeem-option-${option.id}`}
        />
      ))}
    </>
  )
}
