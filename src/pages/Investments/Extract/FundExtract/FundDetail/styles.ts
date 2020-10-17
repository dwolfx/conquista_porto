import styled from 'styled-components'
import { themeColors } from 'styles/theme'
import { Container } from 'styled-bootstrap-grid'

import Card from 'components/Card'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'
import { CardHeader, CardBody, CardIconInfo } from 'components/Card/styles'

export const LayerCard = styled(Card)`
  height: 460px;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  border-radius: 8px;

  ${CardHeader} {
    height: 80px;

    @media ${({ theme }) => theme.mediaQueries.xs} {
      border: none;
    }
  }

  ${CardIconInfo} {
    height: 22px;
    margin: 0;
  }

  ${CardBody} {
    overflow-y: auto;
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    height: auto;
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
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

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: ${props => props.theme.spacing(3)}px;
  }
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
  color: 'gray4',
}))``

export const TextValue = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``

export const ColumnItem = styled.div`
  display: flex;
  max-height: 54px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    width: 33%;
  }
`
export const TextError = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
