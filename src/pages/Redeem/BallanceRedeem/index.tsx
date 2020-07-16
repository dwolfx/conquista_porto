import React from 'react'
import useMedia from 'hooks/useMedia'

import {
  BodyWrapper,
  ButtonStyled,
  ButtonWrapper,
  CardStyled,
} from './styles'

interface IBallanceRedeem {
  step: number
  setStep: (step: number) => void
  onChangeFundDetailOpen: (isOpen: boolean) => void
}
const BallanceRedeem = ({ step, setStep, onChangeFundDetailOpen }: IBallanceRedeem) => {
  const isMobile = useMedia('xs')

  const nextStep = () => {
    setStep(step + 1)
  }
  const prevStep = () => {
    setStep(step - 1)
  }

  const cardBody = () => (
    <BodyWrapper>
      CONTENT
    </BodyWrapper>
  )

  const cardFooter = () => (
    <ButtonWrapper>
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
        onClick={nextStep}
      >
        Próximo
      </ButtonStyled>
    </ButtonWrapper>
  )

  return isMobile ? (
    <CardStyled
      headerIconInfo
      headerIconInfoClick={() => onChangeFundDetailOpen(true)}
      headerTitle="Informações"
      footer={cardFooter()}
    >
      {cardBody()}
    </CardStyled>
  ) : (
    <CardStyled footer={cardFooter()}>{cardBody()}</CardStyled>
  )
}

export default BallanceRedeem