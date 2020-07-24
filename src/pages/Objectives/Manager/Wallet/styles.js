import styled from 'styled-components'
import SliderComp from 'components/Slider'

import { TextStyle } from 'components/Text/styles'
import { Col, Row } from 'styled-bootstrap-grid'
import { Button } from 'components/Button/styles'

export const Slider = styled(SliderComp)`
  border-radius: ${props => (props.onlyObjective ? '7px' : 0)};
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  flex: 1;
`

export const ObjectiveInfoColor = styled.span`
  border-radius: 2px;
  display: inline-flex;
  margin-right: 7px;
  height: 7px;
  width: 7px;
`

export const ObjectiveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
  padding: 7px 14px 7px 0;
  width: calc(100% / 3);

  ${TextStyle} {
    align-items: center;
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 7px 14px 7px 14px;
    width: calc(100% / 2);
  }
`

export const ObjectivesInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ObjectivesBar = styled.div`
  background-color: ${props => props.theme.colors.gray3};
  border-radius: 7px;
  display: flex;
  margin: 14px 0;
  height: 7px;
  width: 100%;
`

export const OtherObjectivesBar = styled.div`
  background-color: ${props =>
    props.backgroundColor || props.theme.colors.gray2};
  border-top-left-radius: ${props => (props.hasLeftRadius ? '7px' : 0)};
  border-bottom-left-radius: ${props => (props.hasLeftRadius ? '7px' : 0)};
  border-top-right-radius: ${props => (props.hasRightRadius ? '7px' : 0)};
  border-bottom-right-radius: ${props => (props.hasRightRadius ? '7px' : 0)};
  height: 100%;
  width: ${props => props.percent || 0}%;
`

export const CurrentFundBalance = styled(Col)`
  margin: 21px 0;
  border-bottom: 2px solid ${props => props.theme.colors.blue4};
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 7px 7px 0 0;
  padding: 7px 21px;

  ${TextStyle} {
    margin-bottom: 7px;
  }
`

export const InfoMobileRow = styled(Row)`
  margin: 28px 0;
  justify-content: space-between;
`

export const FooterContainer = styled.div`
  display: block;
  width: 100%;
`

export const BlockButton = styled(Button)`
  margin-bottom: 14px;
  width: 100%;
`

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`
