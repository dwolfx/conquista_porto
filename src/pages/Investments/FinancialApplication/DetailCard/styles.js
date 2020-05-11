import styled from 'styled-components'
import Card from 'components/Card'
import VerticalList from 'components/VerticalList'

export const LayerCard = styled(Card)`
  height: 100%;
`

export const VerticalListMargin = styled(VerticalList)`
  margin: ${props => props.theme.spacing(1)}px 0px;
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

const handleScaling = ({ value, selectedRisk }) => {
  if (value === selectedRisk) {
    return 'scale(1.17)'
  }
  return 'none'
}

export const SquareRiskLevel = styled.div`
  width: ${props => props.theme.spacing(3)}px;
  height: ${props => props.theme.spacing(3)}px;
  margin-right: 4px;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: 4px;
  transition: all 0.3s ease;
  transform: ${handleScaling};
  opacity: ${handleOpacitySquareRisk};
`

export const ContentLayerCard = styled.div`
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const EmptyStateWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 240px;
  margin: auto;
`
