import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.white};
`

export const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BoartTitle = styled(Text).attrs({ type: 'heading3' })`
  padding: 30px 15px;
`
