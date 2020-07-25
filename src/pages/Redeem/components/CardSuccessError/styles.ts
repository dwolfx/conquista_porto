import styled from 'styled-components'
import Button from 'components/Button'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing(3)}px;
`

export const WrapperText = styled.div`
  max-width: 575px;
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing(3)}px;
`

export const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media ${props => props.theme.mediaQueries.xs} {
    justify-content: space-between;
    flex-direction: column;
    button {
      :first-child {
        margin-bottom: ${({ theme }) => theme.spacing(2)}px;
      }
    }
  }
`

export const ButtonsCtrls = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    margin-left: 0;
  }
`
