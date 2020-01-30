import styled, { css, keyframes } from 'styled-components'
import { fundRiskColors } from 'styles/theme'
import IconComponent from 'components/IconExporter'
import RiskDegreeComponent from 'components/RiskDegree'
import ConquistaButton from 'components/Button'

const riskColorsMap = {
  1: fundRiskColors.lowRisk,
  2: fundRiskColors.lowMediumRisk,
  3: fundRiskColors.mediumRisk,
  4: fundRiskColors.mediumHighRisk,
  5: fundRiskColors.highRisk,
}

export const FundBox = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray3};
  border-left: 4px solid
    ${props => riskColorsMap[parseInt(props.borderRisk, 10)]};
  border-radius: 4px;
  margin-bottom: 1rem;
`

export const Badge = styled.span`
  background-color: ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.white};
  display: inline-block;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 14px;
  padding: 0 7px;
  line-height: 16px;
`

export const BadgeWrapper = styled.div`
  cursor: pointer;
  padding: 0 0.5rem;
  z-index: 1;
`

export const FundName = styled.p`
  color: ${props => props.theme.colors.gray6};
  font-size: 14px;
  font-weight: 400;
  padding: 7px 0 0;
  flex: 1 0 90%;
`

export const DetailItem = styled.dl`
  &.small {
    flex: 0 0 25% !important;
  }

  dt {
    color: ${props => props.theme.colors.gray4};
    font-size: 10px;
    font-weight: 600;
  }

  dd {
    color: ${props => props.theme.colors.gray6};
    font-size: 14px;
    font-weight: 700;
  }
`

export const ArrowDown = styled(IconComponent).attrs(() => ({
  name: 'arrowup',
}))`
  border-radius: 24px;
  background-color: ${props => props.theme.colors.blue4};
  border-radius: 24px;
  height: 20px;
  fill: white;
  margin: 0.5rem 0 0;
  padding: 4px;
  flex: 0 0 20px;
  transform: rotate(180deg);
`

export const ArrowUp = styled(IconComponent).attrs(() => ({ name: 'arrowup' }))`
  border-radius: 24px;
  background-color: ${props => props.theme.colors.blue4};
  border-radius: 24px;
  height: 20px;
  fill: white;
  margin: 0.5rem 0 0;
  padding: 4px;
  flex: 0 0 20px;
`

const box = css`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 10px;
  justify-content: space-between;
`

export const BoxHeader = styled.div`
  ${box}
  cursor: pointer;
  padding-top: 0;
  z-index: 1;
`

export const BoxMiddle = styled.div`
  ${box}
  border-top: 1px solid ${props => props.theme.colors.gray3};
  margin-top: 0.5rem;
  justify-content: flex-start;

  ${DetailItem} {
    flex: 1 0 auto;
  }
`

const fadeInDown = keyframes`
  from {
    height: 0%;
    opacity:0;
    transform: translatey(-10px);
  }
  to {
    height: 100%;
    opacity:1;
    transform: translatey(0);
  }
`

export const BoxBottom = styled.div`
  ${box}
  border-top: 1px solid ${props => props.theme.colors.gray3};
  height: 0%;
  transform: translatey(-10px);
  opacity:0;

  &.show {
    animation-name: ${fadeInDown};
    animation-duration: .5s;
    height: 100%;
    opacity:1;
    transform: translatey(0);
  }

  &.hidden {
    height: 0;
    padding: 0;
    opacity:0;
    transform: translatey(-10px);
    display: none;
  }

  ${DetailItem} {
    flex: 0 0 50%;
    &:not(:first-of-type):not(:nth-of-type(2)) {
      margin-top: 1rem;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.colors.gray3};
    margin: 1rem 0;
    width: 100%;
  }
`

export const RiskDegree = styled(RiskDegreeComponent)`
  justify-content: space-between;
  margin: 1.5rem 0;
  max-width: 320px;
  width: 100%;

  label {
    margin-top: -7px;
    line-height: 16px;
    height: 2rem;
    width: 2.5rem;

    &:last-of-type {
      text-align: right;
    }
  }
`

export const InvestButton = styled(ConquistaButton)`
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  height: 40px;
`
