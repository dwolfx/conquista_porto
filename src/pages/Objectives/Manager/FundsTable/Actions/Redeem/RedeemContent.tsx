import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Text from 'components/Text'

import { IRedeemContent } from './types'
import { Checkbox } from './styles'

export default function({
  questions,
  setQuestions,
  setButtonIsDisabled,
}: IRedeemContent) {
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

      {questions.map(option => (
        <Checkbox
          id={option.id}
          checked={!!option.checked}
          onChange={() =>
            setQuestions(currentQuestions => {
              const newOptions = [...currentQuestions].map(item =>
                item.id === option.id
                  ? { ...item, checked: !item.checked }
                  : item
              )
              const selectedItemsQuantity = [...newOptions].filter(
                item => item.checked
              )

              setButtonIsDisabled(selectedItemsQuantity.length === 0)

              return [...newOptions]
            })
          }
          label={
            <Text color="gray5" bold>
              {option.text}
            </Text>
          }
          key={`redeem-option-${option.id}`}
        />
      ))}
    </>
  )
}
