import styled from 'styled-components'

import ButtonLinkCmp from 'components/Button/Link'
import CardCmp from 'components/Card'
import DivisorCmp from 'components/Divisor'
import TextCmp from 'components/Text'

export const Card = styled(CardCmp)`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px
    ${theme.spacing(3)}px ${theme.spacing(4)}px`};
  border-radius: 8px;
  transition: border-color ease 0.3s;

  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  &:last-of-type {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    width: 100%;
  }
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing(4)}px;
  min-width: fit-content;

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-right: ${({ theme }) => theme.spacing(9)}px;
  }
`

export const TitleText = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const CoverageItemsWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(4)}px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-left: ${({ theme }) => theme.spacing(9)}px;
  }
`

export const CoverageItemDescription = styled(TextCmp)`
  width: 220px;
`

export const TextWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const ButtonLink = styled(ButtonLinkCmp)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const Divisor = styled(DivisorCmp)`
  height: auto;
`
