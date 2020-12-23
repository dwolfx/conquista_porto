import styled, { css } from 'styled-components'

import Text from 'components/Text'

const firstColMargin = css`
  margin-left: ${({ theme }) => `${theme.spacing(4)}px`};
  // Horizontal Tablet
  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-right: ${({ theme }) => `${theme.spacing(7)}px`};
  }
  // Desktop
  @media ${props => props.theme.mediaQueries.lgUp} {
    margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
  }
`

const colMarginRight = css`
  // Horizontal Tablet
  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-right: ${({ theme }) => `${theme.spacing(9)}px`};
  }
  // Desktop
  @media ${props => props.theme.mediaQueries.lgUp} {
    margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
  }
`

export const Table = styled.table`
  display: block;
  border-collapse: collapse;
  border: 1px solid ${props => props.theme.colors.gray3};
  border-radius: 4px;
`

export const Thead = styled.thead`
  background-color: ${props => props.theme.colors.gray1};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`

export const Tr = styled.tr`
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  //Last Row
  &:last-child {
    border-bottom: none;
  }

  // Last Column
  & > td:last-child,
  th:last-child {
    // Horizontal Tablet
    @media ${props => props.theme.mediaQueries.mdUp} {
      p {
        margin-right: ${({ theme }) => `${theme.spacing(2)}px`};

        // Desktop
        @media ${props => props.theme.mediaQueries.lgUp} {
          margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
        }
      }
    }
  }
`

export const Th = styled.th`
  text-align: start;
`

export const Td = styled.td``

export const TableFirstHeaderText = styled(Text).attrs(() => ({
  type: 'subheading',
  color: 'gray6',
}))`
  width: 250px;
  ${firstColMargin}
`

export const TableHeaderText = styled(Text).attrs(() => ({
  type: 'subheading',
  color: 'gray6',
}))`
  ${colMarginRight}
`

export const FirstCellText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray5',
}))`
  width: 250px;
  ${firstColMargin}
`

export const CellText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray5',
}))`
  ${colMarginRight}
  width: 154px;
`
