import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'
import HorizontalListComponent from 'components/HorizontalList'

export const ColStyled = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const InfoContent = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }
`

export const HorizontalList = styled(HorizontalListComponent)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`
