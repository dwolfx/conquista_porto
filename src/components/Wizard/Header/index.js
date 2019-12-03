import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Logo from 'assets/images/logo-temp.png'
import Icon from 'components/IconExporter'

import { Container, CloseButton, IconWrapper, Content } from './styles'

const HeaderWizard = ({ showBackButton }) => {
  const history = useHistory()

  const handleClose = () => {
    history.push('/perfil')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const handleBack = () => {
    history.goBack()
  }

  return (
    <Container>
      {showBackButton && (
        <IconWrapper onClick={handleBack}>
          <Icon name="arrowleft" width={20} />
        </IconWrapper>
      )}
      <Content>
        <img src={Logo} alt="conquista logo png" />
      </Content>
      <CloseButton onClick={handleClose} />
    </Container>
  )
}

HeaderWizard.defaultProps = {
  showBackButton: true,
}

HeaderWizard.propTypes = {
  showBackButton: PropTypes.bool,
}

export default HeaderWizard
