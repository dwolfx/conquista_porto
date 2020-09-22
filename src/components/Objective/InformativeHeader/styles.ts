import styled from 'styled-components'

import TextComponent from 'components/Text'
import HorizontalListComponent from 'components/HorizontalList'
import DivisorComponent from 'components/Divisor'

import {
  AccordionWrapper,
  AccordionHeader,
} from 'components/AccordionNew/styles'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.gray3};
  padding: ${({ theme }) => theme.spacing(1)}px;

  & > :first-child {
    width: ${({ theme }) => theme.spacing(26)}px;
    margin-right: ${({ theme }) => theme.spacing(10)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    & > :first-child {
      margin-right: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
    justify-content: center;
    padding: 0;

    ${AccordionWrapper} {
      padding: ${({ theme }) => `${theme.spacing(2)}px
        ${theme.spacing(1)}px`};
      border-radius: 8px;
    }

    ${AccordionHeader} {
      margin: ${({ theme }) =>
        ` 0 ${theme.spacing(2)}px 0 ${theme.spacing(1)}px`};
    }

    & > :first-child {
      width: 100%;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    ${AccordionHeader} {
      margin: 0 ${({ theme }) => theme.spacing(2)}px;
    }
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: auto;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}px `};
  }
`

export const HorizontalList = styled(HorizontalListComponent)`
  & + & {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

export const Divisor = styled(DivisorComponent).attrs(() => ({
  customSize: 'auto',
}))`
  margin: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
`

export const ObjectiveName = styled(TextComponent).attrs(() => ({
  type: 'heading4',
  bold: true,
  color: 'gray6',
}))``

export const InfoTitle = styled(TextComponent).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
  color: 'gray4',
}))``

export const InfoValueText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``
