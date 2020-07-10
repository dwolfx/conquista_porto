import styled from 'styled-components'

import CardComponent from 'components/Card'
import ButtonComponent from 'components/Button'

export const CardStyled = styled(CardComponent)`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(5)}px ${theme.spacing(5)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
    padding: 0;
  }
`

export const BodyWrapper = styled.div`
  overflow: auto;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(100vh - 256px);
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: center;
  }
`

export const ButtonStyled = styled(ButtonComponent)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }

  & + & {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`
