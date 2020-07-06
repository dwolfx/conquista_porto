import styled from 'styled-components'

export const TableGridContent = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 8px;
  margin: ${({ theme }) =>
    `0 ${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(1)}px`};
  display: grid;
  grid-template-columns: 1fr repeat(5, 105px);
  grid-template-rows: 57px repeat(2, 49px);
`

export const Cell = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &.header {
    background-color: ${({ theme }) => theme.colors.gray1};
  }

  &.align-left {
    justify-content: left;
    padding-left: ${({ theme }) => theme.spacing(4)}px;
  }

  &.with-border {
    border-left: 1px solid ${({ theme }) => theme.colors.gray2};
  }
`
