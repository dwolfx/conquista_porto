import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'
import ButtonTag from 'components/Button/Tag'

export const ButtonTagStyled = styled(ButtonTag)``

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

const handleOpacitySquareRisk = ({ value, selectedRisk }) => {
  if (!selectedRisk) {
    return 1
  }
  if (value === selectedRisk) {
    return 1
  }

  return 0.3
}

export const SquareRiskLevel = styled.div.attrs(() => ({
  role: 'button',
}))`
  cursor: pointer;
  width: 21px;
  height: 21px;
  margin-right: 4px;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: 4px;
  transition: all 0.3s ease;

  opacity: ${props => handleOpacitySquareRisk(props)};
`

export const Divisor = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  height: 28px;
  width: 1px;
  margin: 0 21px;
`
