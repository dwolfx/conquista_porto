import { useSelector } from 'react-redux'
import { formatMoney } from 'helpers'
import {
  ConsortiumProperty,
  ConsortiumVehicle,
  CreditCardInfo,
  FinanceableVehicle,
} from './types'

export const useCardItems = (): (ConsortiumProperty &
  ConsortiumVehicle &
  CreditCardInfo &
  FinanceableVehicle)[] => {
  const {
    creditCards,
    vehiclesFinancing,
    consortiumVehicles,
    consortiumBuildings,
  } = useSelector((state: any) => ({
    creditCards: state.creditCard,
    vehiclesFinancing: state.vehicleFinancing,
    consortiumVehicles: state.consortiumVehicle,
    consortiumBuildings: state.consortiumBuilding,
  }))

  const cardCreditTitle = 'Cartão de Crédito'
  const financingVehiclesTitle = 'Financiamento de Veículo'
  const consortiumVehiclesTitle = 'Consórcio de Veículo'
  const consortiumBuildingsTitle = 'Consórcio de imóvel'

  const arrCreditCardItems: CreditCardInfo[] = creditCards.hasError
    ? [
        {
          type: 'error',
          title: cardCreditTitle,
        },
      ]
    : creditCards.data && creditCards.data.length
    ? creditCards.data.map(
        (item: any): CreditCardInfo => ({
          type: 'info',
          title: cardCreditTitle,
          path: '/cartao-credito',
          flag: item?.Bandeira === 'Master' ? 'cardflagmaster' : 'cardflagvisa',
          valor: formatMoney(+item?.LimiteTitularCartao?.LimiteDisponivel),
        })
      )
    : [
        {
          type: 'empty',
          title: cardCreditTitle,
          subtitle: 'O combo de benefícios Porto Seguro',
        },
      ]

  const arrFinancingVehicles: FinanceableVehicle[] = vehiclesFinancing.hasError
    ? [
        {
          type: 'error',
          title: financingVehiclesTitle,
        },
      ]
    : vehiclesFinancing.data && vehiclesFinancing.data.length > 0
    ? vehiclesFinancing.data.map(
        (item: any): FinanceableVehicle => ({
          type: 'progress',
          title: financingVehiclesTitle,
          path: '/financiamento-veiculo',
          totalInstallments: item?.QuantidadeParcelasContratadas,
          paidInstallments: item?.QuantidadeParcelasPagas,
        })
      )
    : [
        {
          type: 'empty',
          title: financingVehiclesTitle,
          subtitle: 'Confiança para adquirir o seu veículo',
        },
      ]

  const arrConsortiumVehicles: ConsortiumVehicle[] = consortiumVehicles.hasError
    ? [
        {
          type: 'error',
          title: consortiumVehiclesTitle,
        },
      ]
    : consortiumVehicles.data && consortiumVehicles.data.length > 0
    ? consortiumVehicles.data.map(
        (item: any): ConsortiumVehicle => ({
          type: 'progress',
          title: consortiumVehiclesTitle,
          path: '/consorcio-veiculo',
          totalInstallments: item?.QuantidadeParcelasContratadas,
          paidInstallments: item?.QuantidadeParcelasPagas,
        })
      )
    : [
        {
          type: 'empty',
          title: consortiumVehiclesTitle,
          subtitle: '50, 72 e 80 meses com taxas especiais',
        },
      ]

  const arrConsortiumBuildings: ConsortiumProperty[] = consortiumBuildings.hasError
    ? [
        {
          type: 'error',
          title: consortiumBuildingsTitle,
        },
      ]
    : consortiumBuildings.data && consortiumBuildings.data.length > 0
    ? consortiumBuildings.data.map(
        (item: any): ConsortiumProperty => ({
          type: 'progress',
          title: consortiumBuildingsTitle,
          path: '/consorcio-imovel',
          totalInstallments: item?.QuantidadeParcelasContratadas,
          paidInstallments: item?.QuantidadeParcelasPagas,
        })
      )
    : [
        {
          type: 'empty',
          title: consortiumBuildingsTitle,
          subtitle: 'Parcelas que cabem no seu orçamento',
        },
      ]

  return [
    ...arrCreditCardItems,
    ...arrFinancingVehicles,
    ...arrConsortiumVehicles,
    ...arrConsortiumBuildings,
  ]
}
