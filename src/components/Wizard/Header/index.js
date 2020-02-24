import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Logo from 'assets/images/logo-temp.png'
import Icon from 'components/IconExporter'

import { Container, CloseButton, IconWrapper, Content } from './styles'

const HeaderWizard = ({ showBackButton, onClose }) => {
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <Container>
      {showBackButton && (
        <IconWrapper
          data-gtm-subname="header"
          data-gtm-name="botao voltar"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          onClick={handleBack}
        >
          <Icon name="arrowleft" width={20} />
        </IconWrapper>
      )}
      <Content>
        <img src={Logo} alt="conquista logo png" />
      </Content>
      <CloseButton
        data-gtm-subname="header"
        data-gtm-name="botao fechar"
        data-gtm-type="click"
        data-gtm-clicktype="button"
        onClick={onClose}
      />
    </Container>
  )
}

HeaderWizard.defaultProps = {
  showBackButton: true,
  onClose: () => {},
}

HeaderWizard.propTypes = {
  showBackButton: PropTypes.bool,
  onClose: PropTypes.func,
}

export default HeaderWizard
