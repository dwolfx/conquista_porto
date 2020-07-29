import styled, { css } from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import CloseIcon from 'assets/icons/close.svg'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import TextComponent from 'components/Text'
import AnbimaComponent from 'components/Anbima'
import Card from 'components/Card'
import Layer from 'components/Layer'
import { ChildrenWrapper } from 'components/Layer/styles'

export const LayerFinancialApplication = styled(Layer)`
  ${ChildrenWrapper} {
    overflow: hidden;
  }
`

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(9)}px;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const FlexTextWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
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
  padding: 0px;
  margin: 0;
  overflow: hidden;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    padding-top: ${props => props.theme.spacing(3)}px;
    margin: auto;
  }
`
export const FooterContainer = styled(Container)`
  display: block;
  margin-top: ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-top: 0;
  }
`

export const GridRowExpanded = styled(Row)`
  height: auto;
  margin: 0;

  @media ${props => props.theme.mediaQueries.mdUp} {
    height: 100%;
    margin: 0px -${({ theme }) => theme.spacing(1)}px;
  }
`
export const GridRow = styled(Row)``
export const GridRowNoMargin = styled(Row)`
  margin: 0px;
`

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

export const LayerCard = styled(Card)`
  height: 100%;
`

interface IMobileScrollContent {
  expandBottomHeight: boolean
  isAlignmentTermOpen: boolean
}

export const MobileScrollContent = styled.div<IMobileScrollContent>`
  width: 100%;
  ${({ isAlignmentTermOpen }) =>
    isAlignmentTermOpen
      ? css`
          overflow: hidden;
        `
      : css`
          overflow: auto;
        `}

  ${({ expandBottomHeight }) =>
    expandBottomHeight
      ? css`
          height: 100%;
          @media ${({ theme }) => theme.mediaQueries.sm} {
            height: calc(100% - 125px);
          }
          @media ${({ theme }) => theme.mediaQueries.xs} {
            height: calc(100% - ${({ theme }) => theme.spacing(24)}px);
          }
        `
      : css`
          height: 100%;
          @media ${({ theme }) => theme.mediaQueries.xs} {
            height: calc(100% - 125px);
          }
        `};
  margin: 0;
  padding: 0;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    padding-bottom: 0px;
  }
`

export const Anbima = styled(AnbimaComponent)`
  margin-top: 0;
`

export const InvestLegalInfo = styled(TextComponent)`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`
