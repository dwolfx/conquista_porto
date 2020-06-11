import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { ReactComponent as AlertIcon } from '../../assets/icons/alert-rounded.svg'
import Button from '../Button'
import {
  WarningWrapper,
  WarningIcon,
  WarningContentWrapper,
  WarningContent,
  WarningTitle,
  WarningText,
  WarningButtonWrapper,
} from './styles'

type TWarnings = any

export default function({ warnings }: TWarnings) {
  const themeContext = useContext(ThemeContext)
  return (
    warnings &&
    warnings.map((item: any, index: any) => (
      <WarningWrapper key={`warning-#${index}`}>
        <WarningContentWrapper>
          <WarningIcon>
            <AlertIcon fill={themeContext.colors.gray3} width="65" />
          </WarningIcon>
          <WarningContent>
            <WarningTitle>{item.title}</WarningTitle>
            <WarningText>{item.message}</WarningText>
          </WarningContent>
        </WarningContentWrapper>

        <WarningButtonWrapper>
          <Button color="primary" onClick={item.buttonAction}>
            {item.buttonText}
          </Button>
        </WarningButtonWrapper>
      </WarningWrapper>
    ))
  )
}
