import styled from 'styled-components'
import { Container, Row, Col } from 'styled-bootstrap-grid'

import Banner from 'components/Banner'
import Card from 'components/Card'
import CardObjectives from 'components/Card/Objectives'

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
