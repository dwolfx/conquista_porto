import React from 'react'

import { ButtonsStepWrapper, ButtonStyled } from './styles'

interface ICardFooter {
  step: number
  prevStep: () => void
  nextStep: () => void
  isNextDisabled?: boolean
  isNextLoading?: boolean
}

const CardFooter = ({ 
  step, 
  prevStep, 
  nextStep, 
  isNextDisabled, 
  isNextLoading,
}: ICardFooter) => {
  return (
    <ButtonsStepWrapper>
      {step > 1 && (
        <ButtonStyled
          data-gtm-subname="card de retirada"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="voltar"
          outline
          onClick={prevStep}
          disabled={false}
        >
          Voltar
        </ButtonStyled>
      )}
      <ButtonStyled
        data-gtm-subname="card de retirada"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-name="proximo"
        color="secondary"
        loading={isNextLoading}
        loadingColor="green4"
        disabled={isNextDisabled || isNextLoading}
        onClick={nextStep}
      >
        Próximo
      </ButtonStyled>
    </ButtonsStepWrapper>
  )
}

export default CardFooter
