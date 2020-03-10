import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import Button from 'components/Button'
import { rgba } from 'helpers'

export const SectionRow = styled(Row)`
  height: 100%;
`

export const SectionCol = styled(Col)`
  height: 100%;
  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 14px;
    height: -webkit-fill-available;
    height: -moz-available;
  }
`

export const ModalTextWrapper = styled.div`
  p:first-of-type {
    margin-bottom: 7px;
  }

  margin: ${props => (props.margin ? props.margin : '0 0 28px 0')};
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

export const PieChartContainer = styled.div`
  height: 100%;
  width: 100%;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 305px;
    width: 236px;
    margin: 0 auto;
  }
`

export const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const SliderImageBox = styled.div`
  border-radius: 8px;
  height: 100%;
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
  padding-left: 14px;
  position: absolute;
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;

  p {
    color: ${props => props.theme.colors.white};
  }
`

export const SliderTextBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 14px 14px;

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

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 0 35px;

  button {
    margin-top: 14px;
  }
`
