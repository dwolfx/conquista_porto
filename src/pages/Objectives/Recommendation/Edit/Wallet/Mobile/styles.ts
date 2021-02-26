import styled from 'styled-components'
import ButtonCmp from 'components/Button'

export const Container = styled.div``

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0px ${theme.spacing(3)}px`};
`

export const RemoveFundButton = styled(ButtonCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
