import { Row } from 'styled-bootstrap-grid'

import styled from 'styled-components'
import Card from 'components/Card'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

export const FullHeightCard = styled(Card)`
  height: 100%;
  position: relative;

  @media ${props => props.theme.mediaQueries.md} {
    height: inherit;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    margin-top: 0;
  }
`

export const CardContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
`

export const InfoRow = styled(Row)`
  margin-left: -${({ theme }) => theme.spacing(2)}px;
  margin-right: -${({ theme }) => theme.spacing(2)}px;
`

export const InfoItem = styled.div<any>`
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${props => props.theme.spacing(5)}px;

  @media ${props => props.theme.mediaQueries.md} {
    margin-top: ${props => props.theme.spacing(3)}px;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const TextValue = styled(Text)`
  display: flex;
  margin-top: ${props => props.theme.spacing(1)}px;

  span {
    margin-left: ${props => props.theme.spacing(1)}px;
  }
`

export const InformationIcon = styled(Icon).attrs(() => ({
  color: 'gray4',
  name: 'information',
  width: 21,
}))`
  position: relative;
  top: 5px;
`

export const PopoverContentContainer = styled.div`
  max-width: 180px;
`
