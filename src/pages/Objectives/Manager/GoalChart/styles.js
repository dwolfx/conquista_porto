import styled, { css, keyframes } from 'styled-components'
import { TextStyle } from 'components/Text/styles'
import IconButton from 'components/Button/Icon'

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
  padding-top: 42px;
  height: 305px;
`

export const ButtonContainer = styled.div``

export const PreviousButton = styled(IconButton).attrs(() => ({
  icon: 'arrowleft',
  color: 'secondary',
  size: 'large',
}))``

export const NextButton = styled(IconButton).attrs(() => ({
  icon: 'arrowright',
  color: 'secondary',
  size: 'large',
}))``

export const ChartItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`

const scale = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`

export const ChartItem = styled.div`
  width: 56px;
  height: ${props => `${props.height}px`};
  border-radius: 7px 7px 0px 0px;
  background-color: ${props => props.theme.colors.gray2};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    width: 100%;
    background-color: ${props => props.theme.colors.magenta2};
    height: ${props => `${props.missingDepositPercentage}%`};
    display: block;
    animation: ${scale} 0.3s ease-out 0s 1 backwards;
    transform-origin: bottom center;
  }

  &:after {
    content: '';
    width: 100%;
    background-color: ${props => props.theme.colors.blue4};
    height: ${props => `${props.depositPercentage}%`};
    display: block;
    position: absolute;
    bottom: 0;
    animation: ${scale} 0.3s ease-out 0s 1 backwards;
    transform-origin: bottom center;
  }
`

export const Chart = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: flex-end;

  ${ChartItemContainer} {
    width: 80px;
  }

  ${TextStyle} {
    width: 80px;
  }
`

export const ChartEvolutionWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px dashed #ccc;
`

export const MonthsContainer = styled.div`
  display: flex;
  justify-content: center;

  ${TextStyle} {
    text-align: center;
  }
`

const indicatorStyle = css`
  height: 104%;
  border: 1px dashed #ccc;
  position: absolute;
  z-index: 1;
`

const indicatorAfterSelectorStyle = css`
  ${props => props.theme.fontTypes.captionUppercase};
  color: ${props => props.theme.colors.gray5};
  position: absolute;
  top: -14px;
  transform: translate(-50%, -50%);
`

export const StartOrEndIndicator = styled.div`
  ${indicatorStyle};
  :after {
    content: ${props => `'${props.content}'`};
    ${indicatorAfterSelectorStyle}
  }
`

export const DepositTextValue = styled.span`
  font-weight: normal;
  color: ${props => props.theme.colors.gray6};
`
