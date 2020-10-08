
import { IBankExtract } from './types'
import { DateFormatter, MoneyFormatter, TypeFormatter } from './utils'
export const columns = () => [
    {
      Header: 'DATA DA TRANSAÇÃO',
      accessor: 'data',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      padding: '14px 0',
      styles: {
        width: '44%',
        minWidth: 140,
        header: {
          width: '41%',
          minWidth: 140,
        },
      },
      format: (row: IBankExtract) => DateFormatter(row),
    },
    {
      Header: 'TIPO',
      accessor: 'tipo',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      styles: {
        width: '18%',
        minWidth: 120,
        header: {
          width: '17%',
          minWidth: 120,
        },
      },
      format: (row: IBankExtract) => TypeFormatter(row),
    },
    {
      Header: 'VALOR',
      accessor: 'valor',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 120,
        width: '32%',
        header: {
          width: '31%',
          minWidth: 110,
        },
      },
      format: (row: IBankExtract) => MoneyFormatter(row),
    },
  ]
