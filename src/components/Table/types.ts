import { Row } from 'react-table'

type TRow = {
  align: string
}

export interface ICell {
  getCellProps: () => void
  row: Row<TRow>
  id: string
  column: any
  value: any
}

export interface IColumn {
  accessor: string
  format: (row: any, toogleFunc?: any) => any
  sort?: (valueA: any, valueB: any) => void
}

interface THeader {
  width: string | number
  widthHeader?: string | number
  render: (param?: string) => void
  isSorted: boolean
  isSortedDesc?: boolean
  getSortByToggleProps: () => void
  getHeaderProps: () => void
  canSort: boolean
  justifyHeader?: string
  align?: string
  columns: []
  Header: string
}

export interface IHeaderWithColumns {
  header: THeader
}

export interface ISimpleHeader {
  header: THeader
}

export interface ITheadWrapper {
  header: THeader
}

type TColumns = {}

export interface ITable {
  autoResetTable?: boolean
  columns: any[]
  data: any[]
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  isFiltering?: boolean
  isSticky?: boolean
  onRowClick?: (param: any) => void
}

export interface ITableBody {
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  isFiltering: boolean
  onError?: () => void
  onRowClick?: (param: any) => void
  prepareRow: (row: Row<object>) => void
  rows: Row<object>[]
}
