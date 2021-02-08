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
