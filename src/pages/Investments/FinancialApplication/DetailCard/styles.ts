import styled from 'styled-components'
import Card from 'components/Card'
import VerticalList from 'components/VerticalList'
import { Container } from 'styled-bootstrap-grid'

import { themeColors } from 'styles/theme'

export const LayerCard = styled(Card)`
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
  }
  @media ${props => props.theme.mediaQueries.mdUp} {
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.lgUp} {
    margin-bottom: 0px;
  }
`

export const VerticalListMargin = styled(VerticalList)`
  margin: ${props => props.theme.spacing(1)}px 0px;
`

export const SquareRiskContainer = styled.div<{ tabletVersion: boolean }>`
  @media ${props => props.theme.mediaQueries.mdUp} {
    display: flex;
  }
  @media ${props => props.theme.mediaQueries.smUp} {
    display: ${props => (props.tabletVersion ? 'flex' : 'none')};
  }
`

interface ISquareRiskProps {
  color: keyof typeof themeColors
  value: string
  selectedRisk: string
}

const handleOpacitySquareRisk = ({ value, selectedRisk }: ISquareRiskProps) => {
  if (!selectedRisk) {
    return 1
  }
  if (value === selectedRisk) {
    return 1
  }

  return 0.3
}

const handleScaling = ({ value, selectedRisk }: ISquareRiskProps) => {
  if (value === selectedRisk) {
    return 'scale(1.17)'
  }
  return 'none'
}

const handleDisplay = ({ value, selectedRisk }: ISquareRiskProps) => {
  if (value === selectedRisk) {
    return 'block'
  }
  return 'none'
}

export const SquareRiskLevel = styled.div<ISquareRiskProps>`
  width: ${props => props.theme.spacing(3)}px;
  height: ${props => props.theme.spacing(3)}px;
  margin-right: 4px;
  background-color: ${props => props.theme.colors[props.color]};
  border-radius: 4px;
  transition: all 0.3s ease;
  transform: ${handleScaling};
  opacity: ${handleOpacitySquareRisk};
  @media ${props => props.theme.mediaQueries.smUp} {
    display: ${handleDisplay};
  }
  @media ${props => props.theme.mediaQueries.mdUp} {
    display: block;
  }
`

export const ContentLayerCard = styled(Container)`
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
