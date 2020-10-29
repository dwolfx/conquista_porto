import { RefObject } from 'react'
import { Row } from 'react-table'

export type TColumns = {
  Header: string
  accessor: string
  align?: 'flex-start' | 'flex-end' | 'center' | 'start' | 'end'
  justifyHeader?: 'flex-start' | 'flex-end' | 'center'
  styles?: {
    width?: string | number
    minWidth?: string | number
    header?: {
      width?: string | number
      minWidth?: string | number
    }
  }
  sticky?: 'left' | 'right'
  canSort?: boolean
  format?: (row: any, toogleFunc?: any) => any
  sort?: (valueA: any, valueB: any) => void
}

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

export interface ITable {
  autoResetTable?: boolean
  columns: any[]
  data: any[]
  disableSort?: boolean
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  onError?: () => void
  isFiltering?: boolean
  isSticky?: boolean
  customRef?: RefObject<HTMLDivElement>
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
