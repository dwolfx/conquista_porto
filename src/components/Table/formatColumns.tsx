import React from 'react'

import Text from 'components/Text'
import { Currency } from 'helpers/money'
// import { Currency, errors, BRLCurrency } from 'helpers/money'
// import { useToast } from 'hooks/toast'

import { TColumns, ICell } from './types'
import { WrapperContent } from './styles'

// interface IFormatValue {
//   row: IFunds
//   onBlur: ({ row, event, value }: IHandleInputsBlur) => void
//   type: 'initial_value' | 'monthly_value'
//   onChange?: ({ row, inputedValue }: IHandleInputsChange) => void
// }

// const FormatInput = ({ row, onBlur, onChange, type }: IFormatValue) => {
//   const { addToast } = useToast()
//   const minValue = getMinFundValue(type)

//   const [innerValue, setInnerValue] = useState(row[type])
//   const [compareError, setCompareError] = useState(false)

//   const { isLoadingRelculateFundsData } = useSelector<any, any>(
//     state => state.objective
//   )

//   useEffect(() => {
//     setCompareError(innerValue < minValue)
//   }, [innerValue, minValue])

//   function getMinFundValue(moneyInputName: string): number {
//     let minFundValue: number
//     switch (moneyInputName) {
//       case 'initial_value':
//         minFundValue = row.min_initial_value
//         break
//       case 'monthly_value':
//         minFundValue = row.min_value_to_invest
//         break
//       default:
//         throw new UnexpectedTextException(
//           'MoneyInput name attribute',
//           ['initial_value', 'monthly_value'],
//           moneyInputName
//         )
//     }
//     return minFundValue
//   }

//   function minFundValueValidation(event: React.ChangeEvent<HTMLInputElement>) {
//     try {
//       const innerFundCurrency = new BRLCurrency(event.target.value)
//       const minFundCurrency = new BRLCurrency(Currency.parse(minValue))

//       setInnerValue(
//         innerFundCurrency.mustBeGreaterThen(minFundCurrency).toNumber()
//       )
//       setCompareError(false)
//     } catch (error) {
//       switch (error.constructor) {
//         case errors.ValidationCurrencyException:
//           addToast({
//             type: 'error',
//             title: 'Erro de validação',
//             description: 'o valor digitado não é válido.',
//           })
//           console.error(error)
//           break
//         case errors.CompareCurrencyException:
//           const currency = new BRLCurrency(event.target.value)
//           setCompareError(true)
//           setInnerValue(currency.toNumber())
//           break
//         default:
//           addToast({
//             type: 'error',
//             title: 'Erro não esperado',
//             description: 'Volte mais tarde ou recarregue a página',
//           })
//           console.error(error)
//       }
//     }
//   }

//   return (
//     <Popover
//       tooltip
//       turnOff={!compareError}
//       content={() => (
//         <Text type="body" color={'white'}>
//           Insira um valor a partir de {Currency.parse(minValue)}, por favor.
//         </Text>
//       )}
//     >
//       <s.MoneyInput
//         key={`fund_${type}_${row.fund_id}`}
//         prefix="R$"
//         name={type}
//         error={compareError}
//         value={Currency.parse(innerValue)}
//         maxLength={14}
//         disabled={isLoadingRelculateFundsData}
//         onFocus={minFundValueValidation}
//         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//           minFundValueValidation(event)

//           if (onChange) {
//             onChange({ row, inputedValue: innerValue, type })
//           }
//         }}
//         onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
//           onBlur({
//             event,
//             row,
//             value: innerValue,
//             hasError: compareError,
//           })
//         }}
//       />
//     </Popover>
//   )
// }

const FormatMoney = ({ cell }: { cell: ICell }) => (
  <Text type="title" color="gray6" bold>
    {Currency.parse(cell.value, true)}
  </Text>
)

const FormatDefault = ({ cell }: { cell: ICell }) => (
  <WrapperContent>
    <Text color="gray5" bold>
      {cell.value}
    </Text>
  </WrapperContent>
)

export default function FormatColumns(columns: TColumns[], onRowClick: any) {
  const formatters: any = {
    // input: (column: TColumns) => ({
    //   ...column,
    //   FormatInput
    // }),
    money: (column: TColumns) => ({
      ...column,
      Cell: FormatMoney,
    }),
    default: (column: TColumns) => ({
      ...column,
      Cell: FormatDefault,
    }),
  }

  return columns.map(column => {
    if (column.format) {
      const FormatedCell = ({ cell }: any) =>
        column.format!(cell.row.original, onRowClick)

      return {
        ...column,
        Cell: FormatedCell,
        sortType(rowA: any, rowB: any) {
          if (column.sort) {
            return column.sort(rowA.original, rowB.original)
          }

          return rowA.original[column.accessor] > rowB.original[column.accessor]
            ? 1
            : -1
        },
      }
    }

    return formatters.default(column)
  })
}
