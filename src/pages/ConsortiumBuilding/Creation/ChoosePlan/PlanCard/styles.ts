import styled from 'styled-components'

import {
  Container as ContainerCmp,
  Col as ColCmp,
  Row as RowCmp,
} from 'styled-bootstrap-grid'

import CardCmp from 'components/Card'
import TextCmp from 'components/Text'
import VerticalListCmp from 'components/VerticalList'
import ButtonCmp from 'components/Button'
import DividerCmp from 'components/Divisor'
import HorizontalListCmp from 'components/HorizontalList'

export const CardComponent = styled(CardCmp)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;

  &:nth-child(2n) {
    margin-right: 0px;
  }

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    &:nth-child(2n) {
      margin-right: ${({ theme }) => theme.spacing(2)}px;
    }

    &:nth-child(n + 3) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }

  &:last-of-type {
    margin-right: 0px;
  }
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  width: 417px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: 401px;
  }

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    &:nth-child(3n) {
      margin-right: 0px;
    }
    &:nth-child(n + 3) {
      margin-top: 0px;
    }
    &:nth-child(n + 4) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    &:nth-child(n + 3) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 358px;
    margin-top: 0;

    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 332px;
    margin-right: 0px;
    &:nth-child(n + 2) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Text = styled(TextCmp)``

export const ValueText = styled(TextCmp)``

export const TagText = styled(TextCmp)``

export const Tag = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors.blue4}`};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${props => props.theme.colors.blue4};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px ${theme.spacing(2)}px`};
`

export const Container = styled(ContainerCmp)`
  padding: 0;
`
export const Col = styled(ColCmp)``
export const Row = styled(RowCmp)`
  margin: 0;
`

export const VerticalList = styled(VerticalListCmp)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

export const Button = styled(ButtonCmp)`
  margin: ${({ theme }) => theme.spacing(2)}px 0px;
  width: 100%;
`

export const Divider = styled(DividerCmp)`
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

export const HorizontalList = styled(HorizontalListCmp)``

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
`
