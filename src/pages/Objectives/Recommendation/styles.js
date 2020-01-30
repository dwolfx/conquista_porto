import styled from 'styled-components'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import Text from 'components/Text'
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
