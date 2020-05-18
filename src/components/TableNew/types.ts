import { ColumnInstance, Row } from 'react-table'

// FormatFundoCell.propTypes = {
//   cell: PropTypes.shape({
//     getCellProps: PropTypes.func.isRequired,
//     row: PropTypes.shape({
//       original: PropTypes.shape({
//         url_logo_gestor: PropTypes.string,
//         apelido: PropTypes.string,
//         perfil_risco_ordem: PropTypes.string,
//         categoria_arena: PropTypes.string,
//         id_fundo: PropTypes.string,
//       }),
//     }),
//   }).isRequired,
//   id: PropTypes.string.isRequired,
//   column: PropTypes.shape({
//     toggleModal: PropTypes.func,
//   }).isRequired,
// }

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
  sort: (valueA: any, valueB: any) => void
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

type TColumns = {
}

export interface ITableFunds {
  columns: TColumns[]
  data: []
  fundsType: []
  isError: boolean
  isDrawerOpen?: boolean
  isFiltering?: boolean
  isLoading: boolean
  onShowDetails: (param: any) => void
}

export interface ITableBody {
  isLoading: boolean
  isError: boolean
  isFiltering: boolean
  onError: () => void
  onRowClick: () => void
  onShowDetails: (param: any) => void
  prepareRow: (row: Row<TRow>) => void
  rows: Row<TRow>[]
}
