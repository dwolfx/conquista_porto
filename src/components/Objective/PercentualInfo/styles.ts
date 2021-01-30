import styled from 'styled-components'
import { Row } from 'styled-bootstrap-grid'
import Text from 'components/Text'

export const PercentualInfosContainer = styled(Row)`
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing(1)}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }
`

export const PercentualText = styled(Text)`
  &:nth-child(2n),
  &:nth-child(3n),
  &:nth-child(4n) {
    border-left: 1px solid ${({ theme }) => theme.colors.gray6};
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    &:nth-child(2n) {
      border-left: 0;
      padding-left: 0;
      margin-left: 0;
    }
  }
`
