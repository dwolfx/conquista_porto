import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Logo from 'components/Header/Logo'

import {
  AppsIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BlueText,
  Container,
  ContainerDropdown,
  CloseIcon,
  DiamondIcon,
  HomeIcon,
  IconCircle,
  IdeaIcon,
  ItemContainerDropdown,
  TargetIcon,
  WhiteText,
  MenuHeader,
  ProfileWrapper,
  MenuItensWrapper,
  MenuItem,
  MenuItemExpand,
  MenuItemExpandLabel,
  BottomWrapper,
} from './styles'

const SolutionDropdown = ({ isOpen, setOpen }) => (
  <ContainerDropdown isOpen={isOpen}>
    <ItemContainerDropdown>
      <MenuItem to="/cartao-credito" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Cartão de Crédito</WhiteText>
      </MenuItem>
      <MenuItem to="/consorcio-imovel" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Consórcio de Imóvel</WhiteText>
      </MenuItem>
      <MenuItem to="/consorcio-veiculo" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Consórcio de Veículo</WhiteText>
      </MenuItem>
      <MenuItem to="/financiamento-veiculo" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Financiamento de Veículo</WhiteText>
      </MenuItem>
      <MenuItem to="/investimentos" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Investimentos</WhiteText>
      </MenuItem>
      <MenuItem to="/previdencia-privada" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Previdência Privada</WhiteText>
      </MenuItem>
      <MenuItem to="/seguro-vida" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Seguro de Vida</WhiteText>
      </MenuItem>
      <MenuItem to="/seguro-viagem" onClick={() => setOpen(false)}>
        <WhiteText size={14}>Seguro Viagem</WhiteText>
      </MenuItem>
    </ItemContainerDropdown>
  </ContainerDropdown>
)

export default function ResponsiveHeader({ isOpen, setOpen }) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)

  return (
    <Container isOpen={isOpen}>
      <MenuHeader>
        <Logo onClick={() => setOpen(false)} />
        <IconCircle>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconCircle>
      </MenuHeader>
      <ProfileWrapper>
        <WhiteText size={22}>Olá, Julia.</WhiteText>
        <BlueText to="/perfil" onClick={() => setOpen(false)}>
          Perfil
        </BlueText>
      </ProfileWrapper>
      <MenuItensWrapper>
        <MenuItem to="/" onClick={() => setOpen(false)}>
          <HomeIcon />
          <WhiteText size={21}>Início</WhiteText>
        </MenuItem>
        <MenuItem to="/" onClick={() => setOpen(false)}>
          <TargetIcon />
          <WhiteText size={21}>Objetivos</WhiteText>
        </MenuItem>
        <MenuItemExpand>
          <MenuItemExpandLabel
            onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
          >
            <AppsIcon />
            <WhiteText size={21}>Soluções</WhiteText>
            <IconCircle>
              {isSolutionsOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconCircle>
          </MenuItemExpandLabel>
          <SolutionDropdown isOpen={isSolutionsOpen} setOpen={setOpen} />
        </MenuItemExpand>
        <MenuItem to="/" onClick={() => setOpen(false)}>
          <DiamondIcon />
          <WhiteText size={21}>Pontos</WhiteText>
        </MenuItem>
        <MenuItem to="/" onClick={() => setOpen(false)}>
          <IdeaIcon />
          <WhiteText size={21}>Recomendações</WhiteText>
        </MenuItem>
      </MenuItensWrapper>
      <BottomWrapper>
        <BlueText to="/" onClick={() => setOpen(false)}>
          Sair
        </BlueText>
      </BottomWrapper>
    </Container>
  )
}

ResponsiveHeader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

SolutionDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}
