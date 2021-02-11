import { cpf } from 'helpers'

import { TOptions } from 'components/Inputs/Select/types'

const PPEList = [
  {
    name: 'Eu',
    value: 7,
  },
  {
    name: 'Companheiro(a)',
    value: 1,
  },
  {
    name: 'Cônjuge',
    value: 2,
  },
  {
    name: 'Enteado(a)',
    value: 3,
  },
  {
    name: 'Filho(a)',
    value: 4,
  },
  {
    name: 'Pai ou mãe',
    value: 5,
  },
  {
    name: 'Outros',
    value: 6,
  },
]

const getPoliticalyExposedKinshipOptions = (
  setSelectedPoliticalyExposedKinship: (
    value: React.SetStateAction<{ name: string; value: number }>
  ) => void
): TOptions[] => {
  return [...PPEList].map(PPEItem => ({
    id: PPEItem.value,
    text: PPEItem.name,
    onClick: () => setSelectedPoliticalyExposedKinship(PPEItem),
  }))
}

const radioOptions = [
  {
    value: '0',
    name: 'Sim',
  },
  {
    value: '1',
    name: 'Não',
  },
]

const checkOnChangeCpfValidity = (
  value: string,
  setIsCPFValid: (arg: boolean) => void
) => {
  if (value.replace(/\./g, '').replace('-', '').length < 11) {
    setIsCPFValid(true)
  }
  if (value.replace(/\./g, '').replace('-', '').length === 11) {
    setIsCPFValid(cpf.isValid(value.replace(/\./g, '').replace('-', '')))
  }
}

export {
  checkOnChangeCpfValidity,
  getPoliticalyExposedKinshipOptions,
  PPEList,
  radioOptions,
}
