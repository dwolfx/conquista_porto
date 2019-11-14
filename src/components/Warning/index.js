/* eslint-disable react/no-array-index-key */
import React from 'react'
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

export default ({ warnings }) =>
  warnings &&
  warnings.map((item, index) => (
    <WarningWrapper key={`warning-#${index}`}>
      <WarningContentWrapper>
        <WarningIcon>
          <AlertIcon fill="#d2d2d2" width="65" />
        </WarningIcon>
        <WarningContent>
          <WarningTitle>{item.title}</WarningTitle>
          <WarningText>{item.message}</WarningText>
        </WarningContent>
      </WarningContentWrapper>

      <WarningButtonWrapper>
        <Button color="primary">{item.buttonText}</Button>
      </WarningButtonWrapper>
    </WarningWrapper>
  ))
