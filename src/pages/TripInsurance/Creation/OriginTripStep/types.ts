import * as t from 'store/modules/TripInsurance/DestinationCountries/types'

export interface ISelected {
  name: string
  id: number
}

export interface IDefaultStore {
  destinationCountries: {
    data: t.IPayload
    isLoading: boolean
    hasError: boolean
  }
}

export interface LatinAmericaCountry {
  codigo: string
  descricao: string
}

export const LatinAmericaCountries: LatinAmericaCountry[] = [
  {
    codigo: '12',
    descricao: 'ARGENTINA',
  },
  {
    codigo: '25',
    descricao: 'BOLIVIA',
  },
  {
    codigo: '40',
    descricao: 'CHILE',
  },
  {
    codigo: '44',
    descricao: 'COLOMBIA',
  },
  {
    codigo: '49',
    descricao: 'COSTA RICA',
  },
  {
    codigo: '51',
    descricao: 'CUBA',
  },
  {
    codigo: '55',
    descricao: 'EL SALVADOR',
  },
  {
    codigo: '57',
    descricao: 'EQUADOR',
  },
  {
    codigo: '73',
    descricao: 'GUATEMALA',
  },
  {
    codigo: '79',
    descricao: 'HAITI',
  },
  {
    codigo: '80',
    descricao: 'HONDURAS',
  },
  {
    codigo: '135',
    descricao: 'MEXICO',
  },
  {
    codigo: '145',
    descricao: 'NICARAGUA',
  },
  {
    codigo: '155',
    descricao: 'PANAMA',
  },
  {
    codigo: '157',
    descricao: 'PARAGUAI',
  },
  {
    codigo: '158',
    descricao: 'PERU',
  },
  {
    codigo: '165',
    descricao: 'REPUBLICA DOMINICANA',
  },
  {
    codigo: '203',
    descricao: 'URUGUAI',
  },
  {
    codigo: '207',
    descricao: 'VENEZUELA',
  },
]
