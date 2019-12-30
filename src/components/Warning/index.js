/* eslint-disable react/no-array-index-key */
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

export default function({ warnings }) {
  const themeContext = useContext(ThemeContext)
  return (
    warnings &&
    warnings.map((item, index) => (
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
