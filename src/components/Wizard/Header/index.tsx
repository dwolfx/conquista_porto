import React from 'react'
import { useHistory } from 'react-router-dom'

import Logo from 'assets/images/logo-temp.png'
import Icon from 'components/IconExporter'

import * as s from './styles'

interface IHeaderWizard {
  showBackButton?: boolean
  onClose: () => void
  onBack?: () => void
}

const HeaderWizard = ({ showBackButton, onClose, onBack }: IHeaderWizard) => {
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <s.Container>
      {showBackButton && (
        <s.IconWrapper
          data-gtm-subname="header"
          data-gtm-name="botao voltar"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          onClick={onBack || handleBack}
        >
          <Icon name="arrowleft" width={28} />
        </s.IconWrapper>
      )}
      <s.Content>
        <img src={Logo} alt="conquista logo png" />
      </s.Content>
      <s.CloseButton
        data-gtm-subname="header"
        data-gtm-name="botao fechar"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        onClick={onClose}
        name="close"
        color="gray4"
        width={35}
        height={35}
      />
    </s.Container>
  )
}

export default HeaderWizard
