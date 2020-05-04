import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'
import Banner from 'components/Banner'
import Button from 'components/Button'
import Card from 'components/Card'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
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

export const GridRecommendation = styled.div``

export const GridRow = styled(Row)`
  margin-bottom: 42px;
  height: ${props => props.height};
  justify-content: ${props => props.justifyContent};

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 14px;
  }
`

export const Column = styled(Col)`
  @media ${props => props.theme.mediaQueries.sm} {
    &:not(:first-of-type) {
      margin-top: 14px;
    }
  }
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
  @media ${props => props.theme.mediaQueries.sm} {
    z-index: 11;
  }
`

export const ButtonBar = styled(Button)`
  margin-left: 14px;
  min-width: auto;
`

export const ButtonSubmit = styled(Button)`
  width: 100%;
`

export const FullHeightCard = styled(Card)`
  height: 100%;
  & ${CardBody} {
    overflow: visible;
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
    color: ${props => props.theme.colors.gray5};
    flex: 1;
  }
`

export const BannerTips = styled(Banner)`
  color: ${props => props.theme.colors.white};

  &:before {
    opacity: 0.65;
  }
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

export const CardRow = styled(Row)`
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

export const ButtonContainer = styled.div`
  margin-top: 14px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'flex-start'};
  justify-content: ${props => props.justify || 'flex-start'};
  margin: ${props => props.margin};
`

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 7px 0 7px 14px;

  & svg {
    margin-right: 7px;
  }
`

export const PieChartChildrenContent = styled.div`
  margin: 0 auto;
  width: 80%;
  * {
    margin: 7px 0;
  }
`

export const FormWrapper = styled.div``

export const ColInput = styled(Col)`
  &:not(:first-of-type) {
    margin-top: ${props => (props.error ? '0' : '35px')};
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

export const CardWithCloseButton = styled(Card)`
  position: relative;
  margin-bottom: 42px;
  padding-bottom: 21px;
`

export const CloseButton = styled.div`
  position: absolute;
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

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const UnmetGoalCard = styled.div`
  width: 100%;
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0px;
  }
`

export const DivisorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.isMobile ? 'row' : 'column')};
  height: auto;
  margin: ${props => props.isMobile && '35px 0'};

  p {
    margin: ${props => props.isMobile && '0 7px'};
  }
`

export const SimulateButton = styled(Button)`
  width: 100%;
  margin-top: 21px;
`

export const ProductBannerModal = styled(Modal)`
  margin: 0;
`

export const ProductBannerContent = styled.div`
  width: 700px;

  @media ${props => props.theme.mediaQueries.sm} {
    width: auto;
  }
`

export const ProductBannerItemsContainer = styled(Row)`
  flex-wrap: wrap;

  @media ${props => props.theme.mediaQueries.sm} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export const ProductBannerItem = styled(Col)`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.gray2};
  flex-direction: column;
  height: 150px;
  margin: 17.5px 0;
  padding: 0 37px;
  text-align: center;

  &:nth-child(3n),
  &:last-child {
    border-right: none;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    width: auto;
  }
`

export const WalletSectionGraphContainer = styled.div`
  margin-bottom: 35px;

  @media ${props => props.theme.mediaQueries.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
