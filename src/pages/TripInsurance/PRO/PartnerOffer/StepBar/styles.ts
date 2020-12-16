import { Col, Container } from 'styled-bootstrap-grid'
import styled from 'styled-components'

export const StepBar = styled.div`
  background-color: ${({ theme }) => theme.colors.grayblue1};
  height: 56px;
  position: relative;
`

export const GridContainer = styled(Container)`
  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0px;
  }
`

export const ColStepBar = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0;

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
