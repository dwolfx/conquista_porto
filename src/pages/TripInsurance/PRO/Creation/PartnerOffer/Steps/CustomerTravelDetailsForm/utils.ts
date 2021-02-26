import { cpf } from 'helpers'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

export const genderOptions = (
  setSelectedGender: React.Dispatch<React.SetStateAction<TSelected>>
): TOptions[] => [
  {
    id: 1,
    text: 'Masculino',
    onClick: () => setSelectedGender({ id: 1, name: 'Masculino', value: 'M' }),
  },
  {
    id: 2,
    text: 'Feminino',
    onClick: () => setSelectedGender({ id: 2, name: 'Feminino', value: 'F' }),
  },
]

export const phoneTypeOptions = (
  setSelectedPhoneType: React.Dispatch<React.SetStateAction<TSelected>>
): TOptions[] => [
  {
    id: 1,
    text: 'Celular',
    onClick: () =>
      setSelectedPhoneType({ id: 1, name: 'Celular', value: 'Celular' }),
  },
  {
    id: 2,
    text: 'Fixo',
    onClick: () => setSelectedPhoneType({ id: 2, name: 'Fixo', value: 'Fixo' }),
  },
]

export const radioOptions = [
  {
    value: '1',
    name: 'Sim',
  },
  {
    value: '0',
    name: 'Não',
  },
]

export const renderTableCompanionDataMock = [
  {
    name: 'Bruno Mizhari',
    status: false,
  },
  {
    name: 'Valesca',
    status: false,
  },
  {
    name: 'Anitta',
    status: false,
  },
  {
    name: 'Pablo Vittar',
    status: false,
  },
]

const PPEList = [
  {
    id: 7,
    name: 'Segurado',
  },
  {
    id: 1,
    name: 'Companheiro(a)',
  },
  {
    id: 2,
    name: 'Cônjuge',
  },
  {
    id: 3,
    name: 'Enteado(a)',
  },
  {
    id: 4,
    name: 'Filho(a)',
  },
  {
    id: 5,
    name: 'Pai ou mãe',
  },
  {
    id: 6,
    name: 'Outros',
  },
]

export const getPoliticalyExposedKinshipOptions = (
  setSelectedPoliticalyExposedKinship: (
    value: React.SetStateAction<TSelected>
  ) => void
): TOptions[] => {
  return [...PPEList].map(PPEItem => ({
    id: PPEItem.id,
    text: PPEItem.name,
    onClick: () => setSelectedPoliticalyExposedKinship(PPEItem),
  }))
}

export const checkOnChangeCpfValidity = (
  CPF: string,
  setIsCPFValid: (arg: boolean) => void,
  selectedPoliticalyExposedKinshipID: number,
  customerCPF: string
) => {
  if (+CPF.replace(/\./g, '').replace('-', '').length < 11) {
    setIsCPFValid(true)
  }

  if (+CPF.replace(/\./g, '').replace('-', '').length === 11) {
    setIsCPFValid(cpf.isValid(CPF.replace(/\./g, '').replace('-', '')))
  }

  // If CPF length is equal to 11 and the kinship is not equal to
  // {  id: 7, name: 'Eu', } and the CPF value is equal to customer CPF
  if (
    CPF.replace(/\./g, '').replace('-', '').length === 11 &&
    selectedPoliticalyExposedKinshipID !== 7 &&
    CPF.replace(/\./g, '').replace('-', '') === customerCPF
  ) {
    setIsCPFValid(false)
  }
}
