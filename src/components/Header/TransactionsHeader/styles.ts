import styled from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import CloseIcon from 'assets/icons/close.svg'
import { Container, Col, Row } from 'styled-bootstrap-grid'

export const HeaderWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
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
