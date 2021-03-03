import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import Card from 'components/Card'
import Text from 'components/Text'
import SpinWhite from 'assets/images/pages/Objectives/spin-white.png'
import { CardBody } from 'components/Card/styles'

export const SpacedText = styled(Text)`
  display: flex;
  margin: 7px 0;
`

export const SpacedValue = styled.div`
  display: flex;

  svg {
    margin-left: 14px;
  }

  ${SpacedText} {
    display: block;
    max-width: 215px;
  }
`

export const GridRecommendation = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  min-height: calc(100vh - 93px);
`

interface IGridRow {
  height?: string
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
}
export const GridRow = styled(Row)<IGridRow>`
  margin-bottom: 42px;
  height: ${({ height }) => height};
  justify-content: ${({ justifyContent }) => justifyContent};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 14px;
  }
`

export const Column = styled(Col)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    &:not(:first-of-type) {
      margin-top: 14px;
    }
  }
`

export const SectionsRecommendation = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: ${({ theme }) => `${theme.spacing(3)}px  0 ${theme.spacing(6)}px`};
`

export const SectionBar = styled.section`
  background-color: ${({ theme }) => theme.colors.gray2};
  bottom: 0;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  z-index: 6;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    z-index: 11;
  }
`

export const ButtonBar = styled(Button)`
  margin-left: 14px;
  width: 112px;
`

export const FullHeightCard = styled(Card)`
  height: 100%;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing(1)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    height: auto;
  }
  & ${CardBody} {
    overflow: visible;
  }

  &:first-of-type {
    margin-top: 0px;
  }
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
    color: ${({ theme }) => theme.colors.gray5};
    flex: 1;
  }
`

export const PieChartContainer = styled.div`
  height: 100%;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    height: 305px;
    width: 236px;
    margin: 0 auto;
  }
`

export const PieChartChildrenContainer = styled.div`
  text-align: center;
`

interface IRow {
  padding: string
}

export const SectionRow = styled(Row)<IRow>`
  height: 100%;
  padding: ${({ padding }) => padding};
`

export const CardRow = styled(Row)<IRow>`
  padding: ${({ padding }) => padding};
`

interface ISectionCol {
  display: 'block' | 'flex' | 'none'
}

export const SectionCol = styled(Col)<ISectionCol>`
  height: 100%;
  display: ${({ display }) => display};
  justify-content: center;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 14px;
  }
`

export const SuggestedProduct = styled.div`
  width: 100%;
  &:nth-child(2) {
    border-top: 1px solid;
    border-color: ${props => props.theme.colors.gray3};
    padding-top: 12px;
    margin-top: 12px;
  }
`

export const CardContainer = styled.div`
  margin: 28px 14px;
`

export const ButtonContainer = styled.div`
  margin-top: 14px;
`

interface IWrapper {
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  align: 'flex-start' | 'flex-end' | 'center'
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between'
  margin: string
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  margin: ${({ margin }) => margin};
`

export const PieChartChildrenContent = styled.div`
  margin: 0 auto;
  width: 80%;
  * {
    margin: 7px 0;
  }
`

export const IconLoading = styled.div`
  animation: spin 1s linear infinite;
  background: url(${SpinWhite}) center center no-repeat;
  background-size: contain;
  display: inline-block;
  height: 21px;
  margin-left: 15px;
  position: relative;
  width: 21px;
`

export const WalletSectionGraphContainer = styled.div`
  margin-bottom: 35px;

  @media ${props => props.theme.mediaQueries.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
