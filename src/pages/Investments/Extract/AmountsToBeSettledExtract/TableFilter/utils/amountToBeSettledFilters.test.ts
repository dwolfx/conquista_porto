import amountToBeSettledFilters from './amountToBeSettledFilters'
import { IFilter } from '../../types'

const initialFilters: IFilter = {
  application: false,
  redeem: false,
}

const initialData = [
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
]

describe('amountToBeSettledFilters tests', () => {
  it('should exists', () => {
    expect(amountToBeSettledFilters).toBeDefined()
  })
  it('should return an empty array when no data was provided', () => {
    const filteredExtracts = amountToBeSettledFilters(initialFilters, [])
    expect(filteredExtracts).toHaveLength(0)
  })
  it('should return all data when no filters applied', () => {
    const filteredExtracts = amountToBeSettledFilters(
      initialFilters,
      initialData
    )
    expect(filteredExtracts).toHaveLength(16)
  })
  it('should return all "application" data when filter applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      application: true,
    }
    const filteredExtracts = amountToBeSettledFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(10)
  })
  it('should return all "redeem" data when filter applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      redeem: true,
    }
    const filteredExtracts = amountToBeSettledFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(6)
  })
  it('should return all data with both "application and redeem" filters applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      application: true,
      redeem: true,
    }
    const filteredExtracts = amountToBeSettledFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(16)
  })
})
