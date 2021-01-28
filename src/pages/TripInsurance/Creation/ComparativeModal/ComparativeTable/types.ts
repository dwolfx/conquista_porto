export interface IProps {
  rowData: any[]
  columnTitles: ITableTitles[]
}

export interface ITableTitles {
  planId: string
  planName: string
}

export interface ITableRow {
  planId: string
  planName: string
}
