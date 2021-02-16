import styled from 'styled-components'
import CardComponent from 'components/Card'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

export const Card = styled(CardComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) =>
    `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(3)}`}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0`};
  }

  & > div {
    overflow: visible;
  }
`

export const CardTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0`};
  }
`

export const CardTitleText = styled(Text)``

export const TextLink = styled(Text)``

export const BtnLink = styled(ButtonLink)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 83px;
  }
`
