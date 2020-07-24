import styled from 'styled-components'

export const TableGridContent = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 8px;
  margin: ${({ theme }) =>
    `0 ${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px`};
  display: grid;
  grid-template-columns: 1fr repeat(5, 105px);
  grid-template-rows: 57px repeat(3, 49px);
`

interface ICellProps {
  borderLeft?: boolean
  borderBottom?: boolean
  alignLeft?: boolean
}
export const Cell = styled.div<ICellProps>`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ alignLeft, theme }) => {
    if (alignLeft) {
      return `
        justify-content: left;
        padding-left: ${theme.spacing(4)}px;
      `
    }
  }}

  ${({ borderLeft, theme }) => {
    if (borderLeft) {
      return `border-left: 1px solid ${theme.colors.gray2};`
    }
  }}

  ${({ borderBottom, theme }) => {
    if (borderBottom) {
      return `border-bottom: 1px solid ${theme.colors.gray2};`
    }
  }}
`

export const CellHeader = styled(Cell)`
  background-color: ${({ theme }) => theme.colors.gray1};
`
