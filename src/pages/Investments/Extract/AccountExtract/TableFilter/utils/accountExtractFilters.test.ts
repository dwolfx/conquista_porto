import accountExtractFilters from './accountExtractFilters'
import { IFilter } from '../../types';

const initialFilters: IFilter = {
  entry: false,
  withdraw: false,
}

const initialData = [
  {
    "tipo": "Entrada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Entrada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  }
]

describe('useFilter tests', () => {
  it('should exixts', () => {
    expect(accountExtractFilters).toBeDefined()
  })
  it('should return an empty array when no data was provided', () => {
    const filteredExtracts = accountExtractFilters(initialFilters, [])
    expect(filteredExtracts).toHaveLength(0)
  })
  it('should return all data when no filters applied', () => {
    const filteredExtracts = accountExtractFilters(initialFilters, initialData)
    expect(filteredExtracts).toHaveLength(15)
  })
  it('should return all "application" data when filter applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      entry: true
    }
    const filteredExtracts = accountExtractFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(10)
  })
  it('should return all "withdraw" data when filter applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      withdraw: true
    }
    const filteredExtracts = accountExtractFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(5)
  })
  it('should return all data with both "application and withdraw" filters applied', () => {
    const newFilter: IFilter = {
      ...initialFilters,
      entry: true,
      withdraw: true
    }
    const filteredExtracts = accountExtractFilters(newFilter, initialData)
    expect(filteredExtracts).toHaveLength(15)
  })
})