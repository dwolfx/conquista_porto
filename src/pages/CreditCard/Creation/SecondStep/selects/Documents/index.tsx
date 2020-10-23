import React, { useState, Dispatch, SetStateAction } from 'react'
import { DocumentType } from 'pages/CreditCard/Creation/types'
import Select from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'
import { optionsToSelected } from 'pages/CreditCard/Creation/utils'

export default function DocumentsCreditCardSelect({
  state,
}: {
  state: [DocumentType | null, Dispatch<SetStateAction<DocumentType | null>>]
}) {
  const [, setValue] = state

  const options: TOptions[] = [
    {
      id: 1,
      text: 'RG',
      onClick: () => onClickOptionHandler(DocumentType.RG),
    },
    {
      id: 2,
      text: 'CNH',
      onClick: () => onClickOptionHandler(DocumentType.CNH),
    },
    {
      id: 3,
      text: 'RNE',
      onClick: () => onClickOptionHandler(DocumentType.RNE),
    },
    {
      id: 4,
      text: 'Passaporte',
      onClick: () => onClickOptionHandler(DocumentType.PASSPORT),
    },
  ]

  const [currentOption, setCurrentOption] = useState<TOptions | null>(null)

  function selectedHandler() {
    const defaultState = { id: 0 }
    return currentOption ? optionsToSelected(currentOption) : defaultState
  }

  function onClickOptionHandler(clickedOption: DocumentType) {
    const clickedOptionObject = options.find(
      ({ text }) => text === clickedOption
    )
    setValue(clickedOption)
    setCurrentOption(clickedOptionObject || null)
  }

  return (
    <Select label="Documento" options={options} selected={selectedHandler()} />
  )
}
