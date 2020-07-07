import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import CardObjectives from 'components/Card/Objectives'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import * as HorizontalListStyled from 'components/HorizontalList/styles'
import DivisorComponent from 'components/Divisor'
import ConquistaIcon from 'components/IconExporter'
import AccordionNewComponent from 'components/AccordionNew'
import { LegendText } from 'components/Loading/styles'
import VerticalList from 'components/VerticalList'

export const GridContainer = styled(Container)``

export const GridRow = styled(Row)`
  &#t1,
  &#t2,
  &#t3 {
    height: 430px;
    margin: 0;
    margin-bottom: ${props => props.theme.spacing(4.5)}px;

    @media ${props => props.theme.mediaQueries.md} {
      height: auto;
      margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    }
  }
  &#t3 {
    margin-bottom: 0;
  }
`

export const HorizontalListWithMargin = styled(HorizontalList)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const GridCol = styled(Col)`
  &#menu {
    transition: all 0.35s ease-in-out;
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
    @media ${props => props.theme.mediaQueries.md} {
      max-width: 560px;
      bottom: ${({ theme }) => theme.spacing(2)}px;
      left: 0;
      right: 0;
      height: 63px;
      margin-left: auto;
      margin-right: auto;
      position: fixed;
      z-index: 1;
    }
    @media ${props => props.theme.mediaQueries.sm} {
      max-width: 490px;
    }
  }
`
export const PieItemMargin = styled.div`
  margin: 5px 0px;
`

export const SectionRow = styled(Row)`
  height: 100%;
`

export const SectionCol = styled(Col)`
  height: 100%;

  &.custom-padding {
    padding-top: 51px;
    padding-bottom: 51px;
  }

  @media ${props => props.theme.mediaQueries.md} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }

  @media all and (-moz-images-in-menus: 0) {
    height: -webkit-fill-available;
    height: -moz-available;
  }
`

export const Wrapper = styled.div`
  margin: 30px auto;

  @media ${props => props.theme.mediaQueries.lg} {
    margin: ${({ theme }) => theme.spacing(13)}px auto;
  }
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const FullHeightCardObjectives = styled(CardObjectives)`
  height: 100%;
  @media ${props => props.theme.mediaQueries.md} {
    height: 150px;
  }
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};
`

export const BannerTipTitle = styled(Text)`
  ${props => props.theme.fontTypes.heading3};
  font-weight: normal;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.md} {
    ${props => props.theme.fontTypes.heading4};
    text-transform: none;
  }
`

export const CardPontosFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const PointsInfo = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  display: flex;
  padding: 14px;
  flex-wrap: wrap;

  p:first-child {
    color: ${props => props.theme.colors.gray5};
  }
  p:last-of-type {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

export const PointsList = styled.div`
  flex: 1;
  overflow-y: scroll;
`
export const PointsButtonWrapper = styled.div`
  margin-left: auto;
  button {
    width: 110px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: unset;
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    button {
      width: 100%;
    }
  }
`

export const PointDate = styled(Text)`
  color: ${props => props.theme.colors.gray5};
`

export const PointName = styled(Text)`
  color: ${props => props.theme.colors.gray5};
  flex: 1%;

  @media ${props => props.theme.mediaQueries.md} {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 170px;
    overflow: hidden;
  }
`

export const PointNumber = styled(Text)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const EmptyProductItemRow = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)}px 0px;
`

export const EmptyBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const EmptyText = styled(Text)`
  color: ${props => props.theme.colors.gray5};
  text-align: center;
  width: 314px;
`

export const EmptyButton = styled(Button)`
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  min-width: 0;
`

export const ProductItem = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.gray5};
`

export const ProductItemRow = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`};
`

export const LinearProgressBarContent = styled.div`
  width: 56px;
`

export const ThreeItemsLine = styled.div`
  display: grid;
  width: 100%;
  margin: 12px 0 0px 0;
  grid-template-columns: ${props => props.gridTemplateColumns};
`

export const ItemLine = styled.div`
  height: ${props => (props.height ? props.height : 'auto')};
  width: ${props => (props.width ? props.width : 'auto')};
  justify-self: ${props => (props.justifySelf ? props.justifySelf : 'start')};
  align-self: ${props => (props.alignSelf ? props.alignSelf : 'center')};
  padding: ${props => (props.padding ? props.padding : '0')};
`

export const OverflowCard = styled.div`
  height: 100%;
  overflow: auto;
`

export const BannerButton = styled(Button)`
  margin-top: 20px;
  min-width: unset;
`

export const ContainerBox = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 8px;
`

export const ModalContentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(4)}px;
`

export const ModalTextWrapper = styled.div`
  p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }

  margin: ${props => (props.margin ? props.margin : '0 0 28px 0')};
  max-width: 588px;
`

export const ProductsCol = styled(SectionCol)`
  @media ${props => props.theme.mediaQueries.md} {
    height: 430px;
  }
`

export const PointsExtractListWrapper = styled.div`
  height: 100%;

  @media ${props => props.theme.mediaQueries.md} {
    height: 551px;
  }
`

export const AdRow = styled(GridRow)`
  margin-bottom: ${props =>
    props.hasBannerCookie && `${props.theme.spacing(4.5)}px`};
`

export const TipBannerContainer = styled(Row)`
  height: 50%;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
`

export const ObjectivesContainer = styled(Row)`
  height: 50%;
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
`
export const Icon = styled(ConquistaIcon)`
  width: 21px;
  height: 21px;
`
export const ObjectivesListContainer = styled.div`
  overflow-y: auto;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const VerticalListStyled = styled(VerticalList)`
  padding: ${({ theme }) => theme.spacing(1)}px 0;
`

export const ObjectivesTableContainer = styled(Row)`
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

export const ObjectivesTableBox = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ObjectivesAccordion = styled(AccordionNewComponent)`
  width: 100%;
  padding: 0px;
  margin: 0px;
`

export const ObjectiveDivisor = styled(DivisorComponent)`
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`

export const LoadingStateObjectivesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing(5)}px;

  ${LegendText} {
    text-align: center;
  }
`

export const ErrorText = styled.span`
  color: ${props => props.theme.colors.magenta2};
  display: block;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  ${props => props.theme.fontTypes.captionUppercase}
`

export const PointsEmptyContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing(8)}px;
  text-align: center;
`

export const HorizontalListTruncateStartBlock = styled(HorizontalList)`
  ${HorizontalListStyled.StartBlock} {
    flex: 1;
    min-width: 0;
  }
`

export const ObjectivePercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 112px;
`

export const PointsHorizontal = styled(HorizontalList)`
  @media ${props => props.theme.mediaQueries.sm} {
    display: block;
    height: inherit;

    &:not(:first-of-type) {
      margin-top: ${props => `${props.theme.spacing(4)}px`};
    }

    ${HorizontalListStyled.EndBlock} {
      margin: ${props => `${props.theme.spacing(1)}px 0 0`};
    }
  }
`
