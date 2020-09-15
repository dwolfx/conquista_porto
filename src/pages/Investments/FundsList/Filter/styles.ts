import styled from 'styled-components'

import { Row } from 'styled-bootstrap-grid'
import ButtonTag from 'components/Button/Tag'
import { themeColors } from 'styles/theme'

export const ButtonTagStyled = styled(ButtonTag)``

export const ButtonContainer = styled.div`
  margin: ${props =>
    `${props.theme.spacing(2)}px 0 ${props.theme.spacing(3)}px 0`};
  display: flex;
  flex-wrap: wrap;

  ${ButtonTagStyled} {
    margin: ${props =>
      `0 ${props.theme.spacing(1)}px 0 ${props.theme.spacing(1)}px`};
  }
`
export const FilterRowContent = styled(Row)`
  margin: ${props =>
    `0 ${props.theme.spacing(1)}px ${props.theme.spacing(3)}px`};
`

export const RowFilterByType = styled(Row)`
  ${ButtonTagStyled} {
    margin-right: ${props => props.theme.spacing(1)}px;
  }
`

export const SquareRiskContainer = styled.div`
  display: flex;
`
const handleOpacitySquareRisk = ({
  disabled,
  selectedRisk,
}: ISquareRiskLevelProps) => {
  if (!selectedRisk || disabled) {
    return 0.2
  }
  return 1
}

interface ISquareRiskLevelProps {
  color: keyof typeof themeColors
  selectedRisk: boolean
  value: string
  disabled?: boolean
}

export const SquareRiskLevel = styled.div.attrs(() => ({
  role: 'button',
}))<ISquareRiskLevelProps>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${props => props.theme.spacing(3)}px;
  height: ${props => props.theme.spacing(3)}px;
  margin-right: ${props => props.theme.spacing(1) / 2 }px;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: ${props => props.theme.spacing(1) / 2 }px;
  transition: all 0.3s ease;
  opacity: ${handleOpacitySquareRisk};
  :last-child {
    margin-right: 0;
  }
`

export const VerticalDivisor = styled.div`
  background-color: ${props => props.theme.colors.gray3};
  height: ${props => props.theme.spacing(4)}px;
  width: 1px;
  margin: 0 ${props => props.theme.spacing(3)}px;
`
export const Badge = styled.span`
  background-color: ${props => props.theme.colors.blue4};
  color: ${props => props.theme.colors.white};
  display: flex;
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  width: ${props => props.theme.spacing(3)}px;
  height: ${props => props.theme.spacing(3)}px;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  border-radius: 50%;
`

export const BadgeWrapper = styled.div`
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  z-index: 1;
`
