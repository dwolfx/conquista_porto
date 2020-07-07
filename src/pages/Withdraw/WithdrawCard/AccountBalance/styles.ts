import styled from 'styled-components'

import TextComponent from 'components/Text'

export const Container = styled.div`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `0 ${theme.spacing(1)}px`};
  }
`

export const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
`

export const LoadingText = styled(TextComponent)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const ErrorText = styled(TextComponent)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`
