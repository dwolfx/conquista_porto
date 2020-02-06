import styled from 'styled-components'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import { Row, Col } from 'styled-bootstrap-grid'

export const SpacedText = styled(Text)`
  display: flex;
  margin: 7px 0;

  svg {
    margin-left: 14px;
  }
`

export const GridRecommendation = styled.div``

export const GridRow = styled(Row)`
  margin-bottom: 42px;
  height: ${props => props.height};
  justify-content: ${props => props.justifyContent};
`
export const SectionsRecommendation = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  padding: 42px 0 55px;
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.colors.gray2};
  bottom: 0;
  padding: 10px 0;
  position: fixed;
  width: 100%;
`

export const ButtonBar = styled(Button)`
  margin-left: 14px;
  min-width: auto;
`

export const FullHeightCard = styled(Card)`
  height: 100%;
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

export const SliderTextBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  p:last-of-type {
    color: ${props => props.theme.colors.gray5};
    flex: 1;
  }
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};
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

export const PieChartChildrenContainer = styled.div`
  text-align: center;
`

export const SectionRow = styled(Row)`
  height: 100%;
  padding: ${props => props.padding};
`

export const SectionCol = styled(Col)`
  height: 100%;
  display: ${props => props.display};
  justify-content: center;
  flex-direction: column;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 14px;
  }
`

export const SuggestedProduct = styled.div`
  width: 100%;
  &:nth-child(2) {
    border-top: 1px solid;
    border-color: ${props => props.theme.colors.gray2};
    padding-top: 12px;
    margin-top: 12px;
  }
`

export const CardContainer = styled.div`
  margin: 28px 14px;
`

export const InfoContent = styled.div`
  margin: 22px 0;
`

export const ButtonContainer = styled.div`
  margin-top: 14px;
`

export const FundsTable = styled.table`
  width: 100%;
  border-spacing: 0px 7px;
`

export const TableHeader = styled.th`
  text-align: ${props => props.textAlign && props.textAlign};
`

export const TableRow = styled.tr`
  opacity: ${props => (props.shouldOppacity ? 0.3 : 1)};
  color: ${props => props.theme.colors.gray6};
  vertical-align: baseline;
`

export const TableData = styled.td`
  text-align: ${props => props.textAlign && props.textAlign};
  width: ${props => (props.width ? props.width : 'unset')};
`

export const ContainerFunds = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

export const Square = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${props => props.color};
  border-radius: 2px;
`

export const PieChartChildrenContent = styled.div`
  margin: 0 auto;
  width: 80%;
  * {
    margin: 7px 0;
  }
`

export const CardWithCloseButton = styled(Card)`
  position: relative;
  margin-bottom: 42px;
  padding-bottom: 21px;
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

export const UnmetGoalCards = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 28px;
`

export const UnmetGoalCard = styled.div`
  width: 100%;
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const DivisorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: auto;
`

export const SimulateButton = styled(Button)`
  width: 100%;
  margin-top: 21px;
`
