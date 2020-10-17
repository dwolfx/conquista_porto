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
