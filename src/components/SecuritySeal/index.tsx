import React from 'react'

import Icon from 'components/IconExporter'

import { Container, StyledText } from './styles'

const SecuritySeal = ({ ...rest }) => (
  <Container {...rest}>
    <Icon name="lock2" color="blue4" height={42} width={42} />
    <StyledText type="subheading" color="gray6" bold>
      ambiente <br /> 100% seguro
    </StyledText>
  </Container>
)

export default SecuritySeal
