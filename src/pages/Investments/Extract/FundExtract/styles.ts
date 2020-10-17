import styled from 'styled-components'
import { Row, Col } from 'styled-bootstrap-grid'

import Table from 'components/Table'
import { TheadTr, TbodyTr } from 'components/Table/styles'

import logoConquistaBeta from 'assets/images/logoConquistaBeta.png'

export const LogoConquistaBeta = styled.img.attrs(() => ({
  src: logoConquistaBeta,
  alt: 'Logo Conquista Beta',
}))``

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RowFilter = styled(Row)`
  margin: 0;
  justify-content: space-between;
`

export const FundDetailContainer = styled.div`
  margin: 0;
`

export const WrapperFilters = styled.div`
  display: flex;
`

export const StyledTable = styled(Table)`
  height: 292px;
  ${TheadTr} {
    justify-content: space-between;
  }
  ${TbodyTr} {
    justify-content: space-between;
    height: 56px;
  }
`

export const ColFundDetail = styled(Col)`
  @media ${props => props.theme.mediaQueries.xs} {
    margin: 0;
    padding: 0;
  }
`
