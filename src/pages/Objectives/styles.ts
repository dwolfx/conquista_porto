import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  min-height: 100vh;
  width: 100%;
`

export const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BoartTitle = styled(Text)`
  padding-top: ${props => props.theme.spacing(5)}px;
`
