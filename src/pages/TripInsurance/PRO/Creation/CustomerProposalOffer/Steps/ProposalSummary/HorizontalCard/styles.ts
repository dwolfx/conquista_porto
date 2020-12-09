import styled from 'styled-components'
import CardCmp from 'components/Card'
import RadioCmp from 'components/Inputs/Radio/New'
import TextCmp from 'components/Text'

interface ICard {
  isCardSelected?: boolean
}

export const Card = styled(CardCmp)<ICard>`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px
    ${theme.spacing(3)}px ${theme.spacing(3)}px`};
  border: 1px solid
    ${({ theme, isCardSelected }) =>
      isCardSelected ? theme.colors.blue4 : theme.colors.gray3};
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

export const RadioOption = styled(RadioCmp)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
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

export const CoveragesTitleWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
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

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
  margin: ${({ theme }) => theme.spacing(1)}px 0;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`

export const CoverageItemDescription = styled(TextCmp)`
  width: 220px;
`

export const TextWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`
