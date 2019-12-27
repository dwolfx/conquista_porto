import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import CardObjectives from 'components/Card/Objectives'
import Text from 'components/Text'

const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const newHex = hex.replace(
    shorthandRegex,
    (m, r, g, b) => r + r + g + g + b + b
  )

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const rgbah = (hex, alpha) => {
  const color = hexToRgb(hex)
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

export const GridContainer = styled(Container)``

export const GridRow = styled(Row)`
  &#t1,
  &#t2,
  &#t3 {
    height: 430px;
    margin: 0;
    margin-bottom: 30px;
  }
  &#t3 {
    margin-bottom: 0;
  }
`

export const GridCol = styled(Col)`
  #menu {
    transition: all 0.35s ease-in-out;
  }
`

export const SectionRow = styled(Row)`
  height: 100%;
`

export const SectionCol = styled(Col)`
  height: 100%;
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

export const CardPontosFooter = styled.div`
  display: flex;
  justify-content: space-between;
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

export const PointsItem = styled.div`
  align-items: center;
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 22px;
  }
`

export const PointDate = styled(Text)`
  color: ${props => props.theme.colors.gray5};
`

export const PointName = styled(Text).attrs({ type: 'title5' })`
  color: ${props => props.theme.colors.gray5};
  flex: 1%;
  padding: 0 14px;
`

export const PointNumber = styled(Text).attrs({ type: 'title5' })`
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
  background-color: ${props => rgbah(props.theme.colors.gray6, 0.63)};
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
