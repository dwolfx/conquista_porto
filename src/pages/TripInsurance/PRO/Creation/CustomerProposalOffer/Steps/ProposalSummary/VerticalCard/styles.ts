import styled from 'styled-components'

import CardCmp from 'components/Card'
import TextCmp from 'components/Text'
import ButtonLinkCmp from 'components/Button/Link'

export const Card = styled(CardCmp)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: border-color ease 0.3s;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing(2)}px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const TitleText = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const CoveragesTitleWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export const CoverageItemsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

export const ItemWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
  margin: ${({ theme }) => theme.spacing(1)}px 0;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    padding-right: 0;
  }
`

export const CoverageItemText = styled(TextCmp)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export const ButtonLink = styled(ButtonLinkCmp)`
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
