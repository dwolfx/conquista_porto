import React, { useState } from 'react'

import {
  AppsIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  Container,
  ContainerDropdown,
  CloseIcon,
  DiamondIcon,
  GearIcon,
  HomeIcon,
  IdeaIcon,
  ItemContainer,
  ItemContainerDropdown,
  Logo,
  TagText,
  TagWrapper,
  TargetIcon,
  WhiteText
} from './styles'
import { Wrapper, BlueText, IconCircle } from '../styles'

export default function ResponsiveHeader({isOpen, setOpen}) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)

  return (
    <Container isOpen={isOpen}>
      <Wrapper bgcolor="#34373e" padding="15px 15px" justify="space-between">
        <Wrapper justify="flex-start">
          <Logo />
        </Wrapper>
        <Wrapper justify="flex-end">
          <IconCircle color="#ff7433">
            <CloseIcon onClick={() => setOpen(false)} />
          </IconCircle>
        </Wrapper>
      </Wrapper>
      <Wrapper
        bgcolor="#555861"
        padding="15px 15px"
        alignItems="flex-start"
        flexDirection="column"
        borderBottom="1px solid #fff"
      >
        <WhiteText size={22}>Olá, Julia.</WhiteText>
        <BlueText>Perfil</BlueText>
      </Wrapper>
      <Wrapper
        bgcolor="#555861"
        padding="15px 15px"
        alignItems="flex-start"
        flexDirection="column"
        borderBottom="1px solid #fff"
      >
        <ItemContainer padding="10px 0px 0px 0px" disable={false}>
          <HomeIcon />
          <WhiteText size={21}>Início</WhiteText>
        </ItemContainer>
        <ItemContainer padding="10px 0px 0px 0px" disable={false}>
          <TargetIcon />
          <WhiteText size={21}>Objetivos</WhiteText>
        </ItemContainer>
        <ItemContainer justify="center" flexDirection="column">
          <ItemContainer justify="center" onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}>
            <ItemContainer padding="10px 0px 0px 0px" disable={false}>
              <AppsIcon />
              <WhiteText size={21}>Soluções</WhiteText>
            </ItemContainer>
            <ItemContainer
              justify="flex-end"
              padding="10px 0px 0px 0px"
              disable={false}
            >
              <IconCircle color="#ff7433">
                {isSolutionsOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </IconCircle>
            </ItemContainer>
          </ItemContainer>
          <ContainerDropdown isOpen={isSolutionsOpen}>
            <ItemContainerDropdown isOpen={isSolutionsOpen} disable>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Cartão de Crédito</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Consórcio de Imóvel</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Consórcio de Veículo</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Financiamento de Veículo</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Investimentos</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable>
                <WhiteText size={14}>Previdência Privada</WhiteText>
                <TagWrapper>
                  <TagText>Em Breve</TagText>
                </TagWrapper>
              </ItemContainer>
              <ItemContainer padding="5px 0px" disable={false}>
                <WhiteText size={14}>Seguro de Vida</WhiteText>
              </ItemContainer>
              <ItemContainer padding="5px 0px 0px 0px" disable={false}>
                <WhiteText size={14}>Seguro Viagem</WhiteText>
              </ItemContainer>
            </ItemContainerDropdown>
          </ContainerDropdown>
        </ItemContainer>
        <ItemContainer padding="10px 0px 0px 0px" disable>
          <GearIcon />
          <WhiteText size={21}>Gerenciador</WhiteText>
          <TagWrapper>
            <TagText>Em Breve</TagText>
          </TagWrapper>
        </ItemContainer>
        <ItemContainer padding="10px 0px 0px 0px" disable={false}>
          <DiamondIcon />
          <WhiteText size={21}>Pontos</WhiteText>
        </ItemContainer>
        <ItemContainer padding="10px 0px 0px 0px" disable={false}>
          <IdeaIcon />
          <WhiteText size={21}>Recomendações</WhiteText>
        </ItemContainer>
      </Wrapper>
      <Wrapper
        bgcolor="#555861"
        padding="15px 15px"
        alignItems="flex-start"
        flexDirection="column"
      >
        <BlueText>Sair</BlueText>
      </Wrapper>
    </Container>
  )
}
