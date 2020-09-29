import styled from 'styled-components'

import TextComponent from 'components/Text'

export const TransactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: ${({ theme }) => theme.spacing(2)}px 0;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px
      ${({ theme }) => theme.spacing(2)}px;
    width: auto;
  }
`

export const Ul = styled.ul`
  margin: ${({ theme }) => theme.spacing(2)}px 0
    ${({ theme }) => theme.spacing(1)}px 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
  grid-gap: 0;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${({ theme }) => theme.spacing(1)}px;
    margin: ${({ theme }) => theme.spacing(1)}px 0
      ${({ theme }) => theme.spacing(2)}px 0;
  }

  & li:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
`

export const Li = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  position: relative;
`

export const LiTitle = styled(TextComponent).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray4',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const LiValue = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))``
