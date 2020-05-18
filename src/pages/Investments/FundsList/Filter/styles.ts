import styled from 'styled-components'

import { Row } from 'styled-bootstrap-grid'
import ButtonTag from 'components/Button/Tag'
import { themeColors } from 'styles/theme'

export const ButtonTagStyled = styled(ButtonTag)``

export const ButtonContainer = styled.div`
  margin: 14px 0 21px 0;
  display: flex;
  flex-wrap: wrap;

  ${ButtonTagStyled} {
    margin: 0 7px 7px 0;
  }
`
export const FilterRowContent = styled(Row)`
  margin: 0px 7px 21px;
`

export const RowFilterByType = styled(Row)`
  ${ButtonTagStyled} {
    margin-right: 7px;
  }
`

export const SquareRiskContainer = styled.div`
  display: flex;
`
const handleOpacitySquareRisk = ({
  value,
  selectedRisk,
}: ISquareRiskLevelProps) => {
  if (selectedRisk) {
    return 1
  }
  return 0.2
}

interface ISquareRiskLevelProps {
  color: keyof typeof themeColors
  selectedRisk: boolean
  value: string
}

export const SquareRiskLevel = styled.div.attrs(() => ({
  role: 'button',
}))<ISquareRiskLevelProps>`
  cursor: pointer;
  width: 21px;
  height: 21px;
  margin-right: 4px;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: ${handleOpacitySquareRisk};
`

export const VerticalDivisor = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  height: 28px;
  width: 1px;
  margin: 0 21px;
`
export const Badge = styled.span`
  background-color: ${props => props.theme.colors.blue4};
  color: ${props => props.theme.colors.white};
  display: flex;
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-itens: center;
  font-size: 11px;
  border-radius: 50%;
`

export const BadgeWrapper = styled.div`
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  z-index: 1;
`
