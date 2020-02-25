import styled from 'styled-components'
import SliderComp from 'components/Slider'

import { TextStyle } from 'components/Text/styles'

export const Slider = styled(SliderComp)`
  border-radius: ${props => (props.onlyObjective ? '7px' : 0)};
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
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
  width: 25%;

  ${TextStyle} {
    align-items: center;
    display: flex;
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
