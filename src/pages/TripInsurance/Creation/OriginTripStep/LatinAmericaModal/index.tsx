import React from 'react'

import Text from 'components/Text'

import * as s from './styles'

interface ILatinAmericaModal {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
  handleAccept: () => void
}

const LatinAmericaModal: React.FC<ILatinAmericaModal> = ({
  isOpen,
  handleClose,
  handleAccept,
  ...rest
}) => {
  const content = () => (
    <>
      <Text type="headline">
        Acidentes ao se locomover de motocicleta não são cobertos pelo seguro
        caso o destino seja qualquer país da América do Sul, incluindo o Brasil.
      </Text>
      <s.Button
        data-gtm-subname="botao modal america latina aceitar"
        data-gtm-name="botao modal america latina aceitar seguro viagem"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        onClick={handleAccept}
      >
        Aceitar
      </s.Button>
    </>
  )

  return (
    <s.Modal
      modalTitle="Acidentes com motocicletas"
      isOpen={isOpen}
      handleClose={() => handleClose(false)}
      {...rest}
    >
      {content()}
    </s.Modal>
  )
}

export default LatinAmericaModal
