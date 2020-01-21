import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'

export const FormWrapper = styled(Row)`
  background-color: ${props => props.theme.colors.white};
  margin-top: 1rem;
  height: 400px;
  padding: 3rem;
  width: 500px;
`
