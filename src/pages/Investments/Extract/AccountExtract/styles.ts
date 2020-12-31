import styled from 'styled-components'
import { Col } from 'styled-bootstrap-grid'

import Card from 'components/Card'

export const ColStyled = styled(Col)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    &:first-child {
      padding: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    &:first-child {
      margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    }
  }
`

export const ContentCard = styled(Card)`
  height: 460px;
`

interface ITableWrapperProps {
  hasError: boolean
}
export const TableWrapper = styled.div<ITableWrapperProps>`
  border: ${({ theme, hasError }) => hasError && `1px solid ${theme.colors.gray3}`};
  border-radius: ${({ hasError }) => hasError && '6px'};
  height: 100%;

  > div:nth-child(2) {
    height: calc(100% - 63px);
  }
`
