import React from 'react'
import Logo from '../../../../../assets/images/logo-temp.png'
import Icon from '../../../../../components/IconExporter'
import { Container, CloseButton, IconWrapper, Content } from './styles'

export default () => (
  <Container>
    <IconWrapper>
      <Icon name="arrowleft" width={20} />
    </IconWrapper>
    <Content>
      <img src={Logo} alt="conquista logo png" />
    </Content>
    <CloseButton to="/perfil" />
  </Container>
)
