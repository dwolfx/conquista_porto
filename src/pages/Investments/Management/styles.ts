import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'

export const GridContainer = styled(Container)`
  background-color: ${props => props.theme.colors.gray1};
  flex: 1 0 auto;
  padding: 0px;
`
