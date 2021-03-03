import React from 'react'

import Text from 'components/Text'

import * as s from './styles'

interface IPassengersOverSeventyModal {
  isOpen: boolean
  isLastStep: boolean
  handleClose: (isOpen: boolean) => void
  handleAccept: () => void
}

const PassengersOverSeventyModal: React.FC<IPassengersOverSeventyModal> = ({
  isOpen,
  isLastStep,
  handleClose,
  handleAccept,
  ...rest
}) => {
  const content = () => (
    <>
      <Text type="headline">
        Pessoas maiores de 70 anos, ou grupos com uma ou mais pessoas acima de
        70 anos, não recebem cobertura do seguro em caso de acidentes durante a
        prática de esportes de aventura.
      </Text>
      {isLastStep ? (
        <s.Button
          data-gtm-subname="botao modal passageiros maiores setenta anos simular"
          data-gtm-name="botao modal passageiros maiores setenta anos simular seguro viagem"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          onClick={handleAccept}
          color="secondary"
          isLastStep={isLastStep}
        >
          ACEITAR E SIMULAR
        </s.Button>
      ) : (
        <s.Button
          data-gtm-subname="botao modal passageiros maiores setenta anos aceitar"
          data-gtm-name="botao modal passageiros maiores setenta anos aceitar seguro viagem"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          onClick={handleAccept}
          isLastStep={isLastStep}
        >
          ACEITAR
        </s.Button>
      )}
    </>
  )

  return (
    <s.Modal
      modalTitle="Esportes de aventura"
      isOpen={isOpen}
      handleClose={() => handleClose(false)}
      {...rest}
    >
      {content()}
    </s.Modal>
  )
}

export default PassengersOverSeventyModal
