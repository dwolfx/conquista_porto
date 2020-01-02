import styled from 'styled-components'
import Text from 'components/Text'

export const Container = styled.div``

export const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BoartTitle = styled(Text).attrs({ type: 'heading3' })`
  padding: 30px 15px;
`
