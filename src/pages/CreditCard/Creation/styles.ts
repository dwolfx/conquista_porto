import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon).attrs(() => ({
  name: 'close'
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const PreviousIcon = styled(Icon).attrs(() => ({
  name: 'arrowleft'
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const GridContainer = styled(Container)`
  padding: 0px;
`

export const GridRow = styled(Row)``

export const GridCol = styled(Col)`
  padding: 0px;
  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

export const StepBar = styled.div`
  background-color: ${props => props.theme.colors.grayblue1};
  height: 56px;
`

export const GridRowStepBar = styled(Row)`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const ColStepBar = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;
`
