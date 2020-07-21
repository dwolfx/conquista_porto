import styled from 'styled-components'
import ButtonComponent from 'components/Button'

export const ButtonsStepWrapper = styled.div`
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
