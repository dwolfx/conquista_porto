import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import InputComp from 'components/NewInput'
import MoneyInputCmp from 'components/Inputs/Money'

export const ColInput = styled(Col as any)<{ error: boolean }>`
  padding: 0;
  margin-bottom: ${({ error, theme }) =>
    error ? '0' : `${theme.spacing(5)}px`};

  &:last-of-type {
    margin-bottom: ${({ error, theme }) =>
      error ? `-${theme.spacing(3)}px` : `${theme.spacing(1.5)}px`};
  }
`

interface IForm {
  hasCustomColSize?: boolean
}

export const FormWrapper = styled.div<IForm>`
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  ${({ theme, hasCustomColSize }) =>
    hasCustomColSize &&
    `
    margin-left: -${theme.spacing(2.5)}px;
    margin-right: -${theme.spacing(2.5)}px;
  `}
  ${ColInput} {
    ${({ theme, hasCustomColSize }) =>
      hasCustomColSize &&
      `
    padding-left: ${theme.spacing(2.5)}px;
    padding-right: ${theme.spacing(2.5)}px;
  `}
  }
`

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: ${({ theme }) =>
    `${theme.spacing(1)}px 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  /* position: absolute; */

  & svg {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const Input = styled(InputComp)`
  height: 47px;
`

export const MoneyInput = styled(MoneyInputCmp)``
