import fundExtractFilters from './fundExtractsFilters'

const mock = [
  {
    data: '2020-11-30T00:00:00-03:00',
    tipo: 'APLICAÇÃO',
    valor: '30000.00',
  },
  {
    data: '2020-12-11T00:00:00-03:00',
    tipo: 'RESGATE',
    valor: '1000.00',
  },
  {
    data: '2020-12-15T00:00:00-03:00',
    tipo: 'COME-COTAS',
    valor: '1000.00',
  },
  {
    data: '2020-12-15T00:00:00-03:00',
    tipo: 'OUTROS',
    valor: '2000.00',
  },
]

describe('fundExtractFilters tests', () => {
  it('should exists', () => {
    expect(fundExtractFilters).toBeDefined()
  })
  it('should return all when no filters were selected', () => {
    const sut = fundExtractFilters(
      { apply: false, others: false, quotaEater: false, redeem: false },
      mock
    )
    expect(sut).toHaveLength(4)
  })
  it('should filter correclty: APLICAÇÃO', () => {
    const sut = fundExtractFilters(
      { apply: true, others: false, quotaEater: false, redeem: false },
      mock
    )
    expect(sut).toHaveLength(1)
    expect(sut).toEqual([
      {
        data: '2020-11-30T00:00:00-03:00',
        tipo: 'APLICAÇÃO',
        valor: '30000.00',
      },
    ])
  })
  it('should filter correclty: OUTROS', () => {
    const sut = fundExtractFilters(
      { apply: false, others: true, quotaEater: false, redeem: false },
      mock
    )
    expect(sut).toHaveLength(1)
    expect(sut).toEqual([
      {
        data: '2020-12-15T00:00:00-03:00',
        tipo: 'OUTROS',
        valor: '2000.00',
      },
    ])
  })
  it('should filter correclty: RESGATE', () => {
    const sut = fundExtractFilters(
      { apply: false, others: false, quotaEater: false, redeem: true },
      mock
    )
    expect(sut).toHaveLength(1)
    expect(sut).toEqual([
      {
        data: '2020-12-11T00:00:00-03:00',
        tipo: 'RESGATE',
        valor: '1000.00',
      },
    ])
  })
  it('should filter correclty: COME-COTAS', () => {
    const sut = fundExtractFilters(
      { apply: false, others: false, quotaEater: true, redeem: false },
      mock
    )
    expect(sut).toHaveLength(1)
    expect(sut).toEqual([
      {
        data: '2020-12-15T00:00:00-03:00',
        tipo: 'COME-COTAS',
        valor: '1000.00',
      },
    ])
  })
})
