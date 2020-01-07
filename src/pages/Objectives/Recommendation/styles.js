import styled from 'styled-components'

import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import { rgba } from 'helpers'
import { Row } from 'styled-bootstrap-grid'

export const GridRecommendation = styled.div``

export const GridRow = styled(Row)`
  margin-bottom: 42px;
  &:last-child {
    margin-bottom: 0;
  }
`
export const SectionsRecommendation = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  padding: 42px 0;
`

export const SectionBar = styled.section`
  background-color: ${props => props.theme.colors.gray2};
  padding: 1rem 0;
  width: 100%;
`

export const ButtonBar = styled(Button)`
  margin-left: 14px;
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

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};
`
