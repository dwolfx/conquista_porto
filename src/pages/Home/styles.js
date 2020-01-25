import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import CardObjectives from 'components/Card/Objectives'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import { rgba } from 'helpers'

export const GridContainer = styled(Container)``

export const GridRow = styled(Row)`
  &#t1,
  &#t2,
  &#t3 {
    height: 430px;
    margin: 0;
    margin-bottom: 30px;

    @media ${props => props.theme.mediaQueries.sm} {
      height: auto;
      margin-bottom: 14px;
    }
  }
  &#t3 {
    margin-bottom: 0;
  }
`

export const HorizontalListWithMargin = styled(HorizontalList)`
  margin: 7px 0;
`

export const TextBlack = styled(Text)`
  color: ${props => props.theme.colors.black};
`

export const GridCol = styled(Col)`
  &#menu {
    transition: all 0.35s ease-in-out;

    @media ${props => props.theme.mediaQueries.sm} {
      position: fixed;
      z-index: 1;
      width: calc(100% - 14px);
      bottom: 14px;
      height: 63px;
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

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 14px;
  }
`

export const Wrapper = styled.div`
  margin: 30px auto;
`

export const FullHeightCard = styled(Card)`
  height: 100%;
`

export const FullHeightCardObjectives = styled(CardObjectives)`
  height: 100%;
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};
`

export const BannerTipTitle = styled(Text)`
  ${props => props.theme.fontTypes.heading};
  font-weight: normal;
  margin-bottom: 7px;
  margin-top: 7px;

  @media ${props => props.theme.mediaQueries.sm} {
    ${props => props.theme.fontTypes.heading4};
    text-transform: none;
  }
`

export const CardPontosFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const OfferBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const OfferImageBox = styled.div`
  border-radius: 8px;
  height: 213px;
  margin-top: 14px;
  margin-bottom: 28px;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const OfferTextBox = styled.div`
  p:last-of-type {
    color: ${props => props.theme.colors.gray5};
  }
`

export const OfferCardButton = styled(Button)`
  width: 100%;
`

export const PointsInfo = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  display: flex;
  padding: 14px 0;

  p:first-child {
    color: ${props => props.theme.colors.gray5};
  }
  p:last-of-type {
    flex: 1;
    padding: 0 14px;
  }
  button {
    width: 110px;
    min-width: 110px;
  }
`

export const PointsList = styled.div`
  flex: 1;
  margin: 14px 0;
  overflow-y: scroll;
`

export const PointDate = styled(Text)`
  color: ${props => props.theme.colors.gray5};
`

export const PointName = styled(Text)`
  color: ${props => props.theme.colors.gray5};
  flex: 1%;
  padding: 0 14px;

  @media ${props => props.theme.mediaQueries.sm} {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 170px;
    overflow: hidden;
  }
`

export const PointNumber = styled(Text)`
  margin-right: 14px;
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
  width: 300px;
`

export const EmptyChartText = styled(Text)`
  color: ${props => props.theme.colors.gray5};
  text-align: center;
`

export const EmptyButton = styled(Button)`
  padding: 0;
  margin-top: 14px;
  min-width: 0;
  width: 230px;
`

export const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const SliderImageBox = styled.div`
  border-radius: 8px;
  height: 155px;
  margin-top: 14px;
  margin-bottom: 21px;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const SliderCaption = styled.div`
  bottom: 0;
  background-color: ${props => rgba(props.theme.colors.gray6, 0.63)};
  padding: 10px 14px;
  position: absolute;
  width: 100%;

  p {
    color: ${props => props.theme.colors.white};
  }
`

export const SliderTextBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  p:last-of-type {
    color: ${props => props.theme.colors.gray5};
    flex: 1;
  }
`

export const SliderBoxButton = styled(Button)`
  width: 100%;
`

export const InvestmentInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  p {
    color: ${props => props.theme.colors.gray5};
  }
`

export const InvestmentInfosRow = styled(Row)`
  height: 50%;
  margin-left: 7px;
  margin-right: 7px;

  &:first-of-type {
    padding-bottom: 7px;
    border-bottom: 1px solid ${props => props.theme.colors.gray2};
  }
  &:last-of-type {
    padding-top: 7px;
  }
`
export const ProductItem = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.gray5};
`

export const ProductItemRow = styled.div`
  width: 100%;
  padding: 14px 14px 0px 14px;
`

export const LinearProgressBarContent = styled.div`
  width: 56px;
`

export const CreditCardItemRow = styled(ProductItemRow)`
  padding: 14px 14px 0px 48px;
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
export const CloseButton = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.gray2};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  right: 28px;
  top: -18px;
  cursor: pointer;
`
export const CloseIcon = styled(Icon)`
  width: 16px;
  height: 16px;
`

export const ContainerBox = styled.div`
  padding: 28px 21px;
  margin-bottom: 28px;
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 8px;
`

export const TableBox = styled.div`
  min-width: 33%;
  margin-bottom: 14px;

  p:first-of-type {
    margin-bottom: 7px;
  }
`

export const ContainerAccountInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const ModalContentWrapper = styled.div`
  padding: 28px;
`

export const ModalTextWrapper = styled.div`
  p:first-of-type {
    margin-bottom: 7px;
  }

  margin: ${props => (props.margin ? props.margin : '0 0 28px 0')};
`

export const PieChartContainer = styled.div`
  height: 100%;
  width: 100%;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 305px;
    width: 236px;
    margin: 0 auto;
  }
`

export const ProductsCol = styled(SectionCol)`
  @media ${props => props.theme.mediaQueries.sm} {
    height: 430px;
  }
`

export const PointsExtractListWrapper = styled.div`
  height: 100%;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 551px;
  }
`

export const AdRow = styled(GridRow)`
  padding-right: 7;
  padding-left: 7;
  /* margin-bottom: 30; */

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 0;
  }
`

export const TipBannerContainer = styled(Row)`
  height: 50%;
  padding-top: 7px;
`

export const ObjectivesContainer = styled(Row)`
  height: 50%;
  padding-bottom: 7px;
`
