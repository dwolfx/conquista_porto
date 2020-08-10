import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

import ButtonCmp from 'components/Button'
import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'
import Divisor from 'components/Divisor'
import Loading from 'components/Loading'
import Icon from 'components/IconExporter'
import VerticalList from 'components/VerticalList'

export const CardStyled = styled(Card)`
  height: 100%;

  @media ${props => props.theme.mediaQueries.xs} {
    border-radius: 0;
    padding: ${({ theme }) => theme.spacing(3)}px 0 0 0;
    max-height: 100vh;
  }

  ${CardBody} {
    max-width: 1000px;

    @media ${props => props.theme.mediaQueries.xs} {
      max-height: 100vh;
    }
  }
`

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${props => props.theme.spacing(2)}px;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  z-index: 1;
`

export const BalanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${props => `${props.theme.spacing(3)}px`};
  height: ${props => `${props.theme.spacing(13)}px`};
`

export const VerticalListStyled = styled(VerticalList)`
  width: auto;
  padding: 0;
  margin-right: ${props => props.theme.spacing(6)}px;
`

export const DivisorStyled = styled(Divisor)<{ margin: string }>`
  margin: ${props => props.margin};
`

export const InputsContainer = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

interface IInputContainer {
  hasError: boolean
}
export const InputContainer = styled(Col)<IInputContainer>`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 ${props => `${props.theme.spacing(3)}px`};
    margin-bottom: ${({ theme, hasError }) => hasError ? theme.spacing(10) : theme.spacing(3)}px;

    &:first-child {
      margin-top: 0;
    }
  }
`

export const LoadingSpinner = styled(Loading)`
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(4)}px;
  width: ${({ theme }) => theme.spacing(4)}px;
`

export const IconRetry = styled(Icon).attrs(() => ({
  name: 'reload',
  color: 'blue4',
}))`
  cursor: pointer;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px !important;
  height: ${({ theme }) => theme.spacing(3)}px;
  width: ${({ theme }) => theme.spacing(3)}px;
`

export const CardFooter = styled.div`
  width: 100%;
  text-align: right;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const CheckboxContainer = styled.div`
  display: flex;

  margin: ${({ theme }) =>
    `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`};

  @media ${props => props.theme.mediaQueries.xs} {
    margin: ${({ theme }) =>
      `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(3)}px`};
  }
`

export const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.blue4};

  &:hover {
    text-decoration: underline;
  }
`

interface IButton {
  isMobile?: boolean
}

export const Button = styled(ButtonCmp)<IButton>`
  width: ${({ isMobile }) => (isMobile ? '100%' : 'auto')};
  min-width: 112px;
`
