import React from 'react'
import { ButtonSubmit } from './styles'

interface IProps {
  onSubmitNewFilters: () => void
  onHandleRemoveFilters: () => void
  applyButtonDisabled: boolean
  cleanUpButtonDisabled: boolean
}
const DrawerFooter = ({
  onSubmitNewFilters,
  onHandleRemoveFilters,
  applyButtonDisabled,
  cleanUpButtonDisabled,
}: IProps) => {
  return (
    <>
      <ButtonSubmit
        outline={!cleanUpButtonDisabled}
        onClick={onHandleRemoveFilters}
        disabled={cleanUpButtonDisabled}
      >
        LIMPAR
      </ButtonSubmit>
      <ButtonSubmit
        color="secondary"
        onClick={onSubmitNewFilters}
        disabled={applyButtonDisabled}
      >
        APLICAR
      </ButtonSubmit>
    </>
  )
}

export default DrawerFooter
