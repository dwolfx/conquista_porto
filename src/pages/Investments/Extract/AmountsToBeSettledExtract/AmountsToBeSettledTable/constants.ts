import { IAmountToBeSettledExtract } from './types'
import {
  DateFormatter,
  FundFormatter,
  MoneyFormatter,
  TypeFormatter,
} from './utils'
export const columns = () => [
  {
    Header: 'DATA DA TRANSAÇÃO',
    accessor: 'data',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    padding: '14px 0',
    styles: {
      width: '210px',
      minWidth: 210,
      header: {
        width: '182px',
        minWidth: 182,
      },
    },
    format: (row: IAmountToBeSettledExtract) => DateFormatter(row),
  },
  {
    Header: 'FUNDO',
    accessor: 'nome',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '334px',
      minWidth: 334,
      header: {
        width: '320px',
        minWidth: 320,
      },
    },
    format: (row: IAmountToBeSettledExtract) => FundFormatter(row),
  },
  {
    Header: 'TIPO',
    accessor: 'tipo',
    align: 'flex-end',
    justifyHeader: 'flex-end',
    styles: {
      minWidth: 120,
      width: '100%',
      header: {
        width: '100%',
        minWidth: 110,
      },
    },
    format: (row: IAmountToBeSettledExtract) => TypeFormatter(row),
  },
  {
    Header: 'VALOR',
    accessor: 'valor',
    align: 'flex-start',
    justifyHeader: 'center',
    styles: {
      minWidth: 134,
      width: '134px',
      header: {
        width: '120px',
        minWidth: 120,
      },
    },
    format: (row: IAmountToBeSettledExtract) => MoneyFormatter(row),
  },
]
