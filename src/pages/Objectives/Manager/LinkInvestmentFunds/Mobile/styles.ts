import styled from 'styled-components'
import Card from 'components/Card'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Backdrop from 'components/Drawer/Backdrop'
import { fundRiskColors } from 'styles/theme'
import { Container } from 'styled-bootstrap-grid'

const riskColorsMap = [
  fundRiskColors.noneRisk,
  fundRiskColors.lowRisk,
  fundRiskColors.lowMediumRisk,
  fundRiskColors.mediumRisk,
  fundRiskColors.mediumHighRisk,
  fundRiskColors.highRisk,
]

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 0;

  p {
    padding: 3px;
  }
`

export const CustomContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const CustomDivisor = styled(Divisor)`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`

export const CustomHorizontalList = styled(HorizontalList)`
  padding: 0;
`

export const CustomCard = styled(Card)`
  padding: 21px;
  position: relative;
  margin: ${({ theme }) => theme.spacing(1)}px 0;
  &:first-child,
  &:last-child {
    margin: 0;
  }
`

export const Content = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
`

export const RiskColor = styled.div<{ colorRisk: number }>`
  background: ${({ colorRisk }) => riskColorsMap[colorRisk]};
  width: 4px;
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px;
  height: calc(100% - 8px);
  border-radius: 10px;
`

export const CardButton = styled(Button)`
  width: 100%;
`

export const ManagerButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const CustomBackdrop = styled(Backdrop)`
  z-index: 13;
`

export const ActionMenuOption = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};

  svg {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
  }
`
