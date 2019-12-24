import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  BasicIcon,
  ArrowUpDownIcon,
  ArrowRightIcon,
  BottomMenuDropdownIcon,
  BottomMenuText,
  IconCircle,
  Menu,
  RelativeParent,
  SolutionsContainer,
  SolutionsDropdownText,
  SolutionsItem,
  Wrapper,
  MenuItem,
  Dropdown,
  MenuLabelDropdown,
} from './styles'

const ItemContent = ({ to, iconName, itemText, setIsOpen }) => (
  <SolutionsItem to={to} onClick={() => setIsOpen(false)}>
    <IconCircle>
      <BottomMenuDropdownIcon name={iconName} />
    </IconCircle>
    <SolutionsDropdownText>{itemText}</SolutionsDropdownText>
    <ArrowRightIcon size={11} />
  </SolutionsItem>
)

const SolutionsContent = ({ setIsOpen }) => (
  <SolutionsContainer>
    <ItemContent
      setIsOpen={setIsOpen}
      to="/cartao-credito"
      iconName="creditcard"
      itemText="Cartão de Crédito"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/consorcio-imovel"
      iconName="homewithwindow"
      itemText="Consórcio de Imóvel"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/consorcio-veiculo"
      iconName="car"
      itemText="Consórcio de Veículo"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/financiamento-veiculo"
      iconName="money"
      itemText="Financiamento de Veículo"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/investimentos"
      iconName="barchart"
      itemText="Investimentos"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/previdencia-privada"
      iconName="time"
      itemText="Previdência Privada"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/seguro-vida"
      iconName="persongroup"
      itemText="Seguro de Vida"
    />
    <ItemContent
      setIsOpen={setIsOpen}
      to="/seguro-viagem"
      iconName="plane"
      itemText="Seguro Viagem"
    />
  </SolutionsContainer>
)

export default function BottomMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu>
      <Wrapper>
        <MenuItem to="/objetivos">
          <BasicIcon name="target" />
          <BottomMenuText>Objetivos</BottomMenuText>
        </MenuItem>
        <RelativeParent>
          <MenuLabelDropdown onClick={() => setIsOpen(!isOpen)}>
            <BasicIcon name="apps" />
            <BottomMenuText>Soluções</BottomMenuText>
            {isOpen ? (
              <ArrowUpDownIcon name="arrowup" />
            ) : (
              <ArrowUpDownIcon name="arrowdown" />
            )}
          </MenuLabelDropdown>
          <Dropdown isOpen={isOpen} setOpen={setIsOpen} width="300px">
            <SolutionsContent setIsOpen={setIsOpen} />
          </Dropdown>
        </RelativeParent>
        <MenuItem to="/">
          <BasicIcon name="gear" />
          <BottomMenuText>Gerenciador</BottomMenuText>
        </MenuItem>
        <MenuItem to="/pontos">
          <BasicIcon name="diamond" />
          <BottomMenuText>Pontos</BottomMenuText>
        </MenuItem>
        <MenuItem to="/">
          <BasicIcon name="idea" />
          <BottomMenuText>Recomendações</BottomMenuText>
        </MenuItem>
      </Wrapper>
    </Menu>
  )
}

ItemContent.propTypes = {
  to: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

SolutionsContent.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
}
