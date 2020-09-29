import styled, { css } from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'

export const HeaderComponent = styled.header`
  width: 100%;
`

export const HeaderWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  display: flex;
  height: 72px;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderColTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderIconCSS = css`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const BackIcon = styled(Icon)`
  ${HeaderIconCSS}
  left: 12px;
`

export const CloseIcon = styled(Icon)`
  ${HeaderIconCSS}
  right: 12px;
`

export const GridContainer = styled(Container)`
  padding: 0px;
`

export const GridRow = styled(Row)``
export const GridRowNoMargin = styled(Row)`
  margin: 0px;
`

export const GridCol = styled(Col)`
  padding: 0 ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }
`

export const StepBar = styled.div`
  background-color: ${props => props.theme.colors.grayblue1};
  height: 56px;
`

export const GridRowStepBar = styled(Row)`
  margin: 0 -${({ theme }) => theme.spacing(2)}px;
`

export const ColStepBar = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`
