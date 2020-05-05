import styled from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import CloseIcon from 'assets/icons/close.svg'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import Card from 'components/Card'

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

interface HeaderIconButtonProps {
  icon: string
}

export const HeaderIconButton = styled.div<HeaderIconButtonProps>`
  background-color: ${props => props.theme.colors.gray4};
  cursor: pointer;
  height: 24px;
  ${props =>
    props.icon === 'ArrowLeft'
      ? `mask-image: url(${ArrowLeft});`
      : `mask-image: url(${CloseIcon});`}
  transition: all ease 0.3s;
  width: 24px;

  &:hover {
    background-color: ${props => props.theme.colors.blue4};
  }
`

export const GridContainer = styled(Container)`
  padding: 0px;
`

export const LayerBodyContainer = styled(Container)`
  height: 78vh;
  padding-top: ${props => props.theme.spacing(4)}px;
  padding-bottom: 21px;
`
export const FooterContainer = styled(Container)``

export const GridRowExpanded = styled(Row)`
  height: 100%;
`
export const GridRow = styled(Row)``
export const GridRowNoMargin = styled(Row)`
  margin: 0px;
`

export const GridCol = styled(Col)``

export const StepBar = styled.div`
  background-color: ${props => props.theme.colors.grayblue1};
  height: 56px;
`

export const ColStepBar = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;
`

export const LayerContent = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing(4)}px 0px
    ${props => props.theme.spacing(3)}px;
  display: flex;
  height: 76vh;
`

export const LayerCard = styled(Card)`
  height: 100%;
`
