import styled from 'styled-components'

import { Col, Row } from 'styled-bootstrap-grid'
import VerticalListComponent from 'components/VerticalList'
import IconComponent from 'components/IconExporter'

export const GridRow = styled(Row)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`

export const GridCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

export const VerticalList = styled(VerticalListComponent)`
  width: auto;
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(5)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
    flex-direction: column;
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const AddIcon = styled(IconComponent).attrs(() => ({
  name: 'add',
  width: 21,
  color: 'gray4',
}))`
  margin: 0 ${({ theme }) => theme.spacing(1)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => theme.spacing(1)}px 0;
  }
`
