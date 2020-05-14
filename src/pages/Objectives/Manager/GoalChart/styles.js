import styled, { css, keyframes } from 'styled-components'
import { TextStyle } from 'components/Text/styles'
import IconButton from 'components/Button/Icon'
import { Col } from 'styled-bootstrap-grid'
import SelectDropdown from 'components/SelectDropdown'
import { Option, Label, OptionsWrapper } from 'components/SelectDropdown/styles'

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding-top: 42px;
  height: 322px;
  margin-top: 35px;

  @media ${props => props.theme.mediaQueries.sm} {
    align-items: flex-start;
    height: 700px;
    margin-top: 49px;
    padding: 21px 0 0 0;
  }
`

export const ButtonContainer = styled.div``

export const PreviousButton = styled(IconButton).attrs(() => ({
  icon: 'arrowleft2',
  size: 'large',
  color: 'transparent',
}))``

export const NextButton = styled(IconButton).attrs(() => ({
  icon: 'arrowright2',
  size: 'large',
  color: 'transparent',
}))``

export const ChartItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${props => props.flexDirection};
  align-items: flex-end;
  position: relative;

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  ${props => props.labelMoment} {
    min-height: 220px;

    @media ${props => props.theme.mediaQueries.sm} {
      min-height: inherit;
    }
  }
`

const scaleY = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`

const scaleX = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

export const ChartItem = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  border-radius: 7px 7px 0px 0px;
  background-color: ${props => props.theme.colors.gray2};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    width: 100%;
    height: ${props => `${props.missingDepositPercentage}%`};
    background-color: ${props => props.theme.colors.magenta2};
    display: block;
    animation: ${scaleY} 0.3s ease-out 0s 1 backwards;
    transform-origin: bottom center;
  }

  &:after {
    content: '';
    width: 100%;
    height: ${props => `${props.depositPercentage}%`};
    background-color: ${props => props.theme.colors.blue4};
    display: block;
    position: absolute;
    bottom: 0;
    animation: ${scaleY} 0.3s ease-out 0s 1 backwards;
    transform-origin: bottom center;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    border-radius: 0px 7px 7px 0px;

    &:before {
      content: '';
      height: 100%;
      width: ${props => `${props.missingDepositPercentage}%`};
      position: absolute;
      right: 0;
      animation: ${scaleX} 0.3s ease-out 0s 1 backwards;
    }

    &:after {
      content: '';
      height: 100%;
      width: ${props => `${props.depositPercentage}%`};
      left: 0;
      animation: ${scaleX} 0.3s ease-out 0s 1 backwards;
    }
  }
`

export const Chart = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: flex-end;

  ${ChartItemContainer} {
    min-width: 80px;
  }

  ${TextStyle} {
    min-width: 80px;
  }
`

export const ChartEvolutionWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px dashed #ccc;

  @media ${props => props.theme.mediaQueries.sm} {
    border-bottom: none;
    flex-direction: column;
    border-left: 2px dashed #ccc;
    margin-left: 7px;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
  }
`

export const MonthsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;
  }

  ${TextStyle} {
    text-align: center;
  }
`

const indicatorStyle = css`
  height: 104%;
  border: 1px dashed #ccc;
  position: absolute;
  z-index: 1;

  @media ${props => props.theme.mediaQueries.sm} {
    width: 70%;
    height: 0;
  }
`

const indicatorAfterSelectorStyle = css`
  ${props => props.theme.fontTypes.captionUppercase};
  color: ${props => props.theme.colors.gray5};
  position: absolute;
  top: -14px;
  transform: translate(-50%, -50%);

  @media ${props => props.theme.mediaQueries.sm} {
    top: 0;
    right: -91px;
  }
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

export const CustomDropdownWrapper = styled(Col)`
  z-index: 2;
  width: 126px;
  margin: 0 auto;
`
export const CustomSelectDropdown = styled(SelectDropdown)`
  background-color: ${props => props.theme.colors.gray1};
  margin: 14px auto;
  border-radius: 7px;
  text-align: left;
  padding-left: 14px;
  font-size: ${props => props.theme.fontTypes.heading4};

  &:before {
    background-color: transparent;
  }
  &:after {
    background-color: black;
  }

  ${OptionsWrapper} {
    border-radius: 0 0 7px 7px;
    position: absolute;
    left: 17px;
    width: inherit;
  }

  ${Option} {
    background-color: ${props => props.theme.colors.gray1};
    padding: 7px 14px;
  }

  ${Label} {
    line-height: 41px;
    margin: 0;
  }
`

export const TopInfoContentPopover = styled.div`
  display: flex;
  margin-bottom: 14px;
  align-items: center;
`

export const IdealMomentLabel = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  margin-top: -98px;
  min-width: 240px;
  padding-bottom: 14px;
  position: absolute;
  top: 0%;
  z-index: 1;

  @media ${props => props.theme.mediaQueries.sm} {
    max-width: 140px;
    min-width: inherit;
    right: 0;
  }
`
