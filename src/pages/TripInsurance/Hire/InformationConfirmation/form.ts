import React from 'react'
import { TOptions, TSelected } from 'components/Inputs/Select/types'

export const radioOptions = [
  {
    value: '0',
    name: 'Não',
  },
  {
    value: '1',
    name: 'Sim',
  },
]

export const radioPpeOptions = [
  {
    value: '2',
    name: 'Não',
  },
  {
    value: '1',
    name: 'Sim',
  },
]

export const selectPpeOptions = (
  setPpeOptionsSelect: React.Dispatch<React.SetStateAction<TSelected>>
): TOptions[] => [
  {
    id: 7,
    text: 'Eu',
    onClick: () => setPpeOptionsSelect({ id: 7, name: 'Eu' }),
  },
  {
    id: 5,
    text: 'Pai ou mãe',
    onClick: () => setPpeOptionsSelect({ id: 5, name: 'Pai ou mãe' }),
  },
  {
    id: 2,
    text: 'Cônjuge',
    onClick: () => setPpeOptionsSelect({ id: 2, name: 'Cônjuge' }),
  },
  {
    id: 1,
    text: 'Companheiro(a)',
    onClick: () => setPpeOptionsSelect({ id: 1, name: 'Companheiro(a)' }),
  },
  {
    id: 4,
    text: 'Filho(a)',
    onClick: () => setPpeOptionsSelect({ id: 4, name: 'Filho(a)' }),
  },
  {
    id: 3,
    text: 'Enteado(a)',
    onClick: () => setPpeOptionsSelect({ id: 3, name: 'Enteado(a)' }),
  },
  {
    id: 6,
    text: 'Outros',
    onClick: () => setPpeOptionsSelect({ id: 6, name: 'Outros' }),
  },
]

export const genderOptions = (
  setGenderSelect: React.Dispatch<React.SetStateAction<TSelected>>,
  setActiveSelectGender: React.Dispatch<React.SetStateAction<boolean>>
): TOptions[] => [
  {
    id: 1,
    text: 'Masculino',
    onClick: () => {
      setGenderSelect({ id: 1, name: 'Masculino' })
      setActiveSelectGender(false)
    },
  },
  {
    id: 2,
    text: 'Feminino',
    onClick: () => {
      setGenderSelect({ id: 2, name: 'Feminino' })
      setActiveSelectGender(false)
    },
  },
]
