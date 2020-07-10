import styled from 'styled-components'
import { themeColors } from 'styles/theme'
import { Container } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'
import { CardBody } from 'components/Card/styles'

export const LayerCard = styled(Card)`
  height: 100%;
  max-height: 62px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  border-radius: 0px;

  ${CardBody} {
    overflow-y: auto;
  }

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
    max-height: 100%;
    padding: 10px ${({ theme }) => theme.spacing(2)}px 10px;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    border-radius: 8px;
  }
  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-bottom: 0px;
    height: 100%;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    border: 0;
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
  if (!selectedRisk || value === selectedRisk) {
    return 1
  }
  return 0.3
}

const handleDisplay = ({ value, selectedRisk }: ISquareRiskProps) => {
  if (value === selectedRisk) {
    return 'block'
  }
  return 'none'
}

export const SquareRiskLevel = styled.div<ISquareRiskProps>`
  width: ${({ theme }) => theme.spacing(3)}px;
  height: ${({ theme }) => theme.spacing(3)}px;
  margin-right: 4px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: ${handleOpacitySquareRisk};
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    display: ${handleDisplay};
  }
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
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

export const TextTitle = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  color: 'gray4'
}))``

export const TextValue = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6'
}))``