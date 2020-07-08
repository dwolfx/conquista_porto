import React from 'react'
import { ButtonSubmit } from './styles'
import { GTM_DATA_FUNDS_FILTROS_DRAWER } from 'pages/Investments/Management/types'
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
        {...GTM_DATA_FUNDS_FILTROS_DRAWER}
        data-gtm-name="botao limpar drawer filtros fundos"
        outline={!cleanUpButtonDisabled}
        onClick={onHandleRemoveFilters}
        disabled={cleanUpButtonDisabled}
      >
        LIMPAR
      </ButtonSubmit>
      <ButtonSubmit
        {...GTM_DATA_FUNDS_FILTROS_DRAWER}
        data-gtm-name="botao aplicar drawer filtros fundos"
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
