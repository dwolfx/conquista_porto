import React from 'react'

import {
  CheckboxGroup,
  CheckboxWrapper,
  ConfigurationSection,
  ConfigurationBody,
  Text,
} from './styles'
import CheckboxItem from './CheckboxItem'

const Configurations = ({ ...props }) => (
  <ConfigurationBody {...props}>
    <ConfigurationSection>
      <Text type="title5">Configurações</Text>
      <CheckboxWrapper>
        <CheckboxGroup>
          <CheckboxItem checked>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem checked>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem checked>Lorem ipsum dolor sit amet</CheckboxItem>
        </CheckboxGroup>
        <CheckboxGroup>
          <CheckboxItem>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem checked>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem checked>Lorem ipsum dolor sit amet</CheckboxItem>
          <CheckboxItem>Lorem ipsum dolor sit amet</CheckboxItem>
        </CheckboxGroup>
      </CheckboxWrapper>
    </ConfigurationSection>
  </ConfigurationBody>
)

export default Configurations
