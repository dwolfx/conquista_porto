import React, { useState } from 'react'

import {
  AppsIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BottomMenuText,
  BarChartIcon,
  CarIcon,
  CreditCardIcon,
  DiamondIcon,
  GearIcon,
  HomeWithWindowIcon,
  IconCircle,
  IdeaIcon,
  Menu,
  MoneyIcon,
  PersonGroupIcon,
  PlaneIcon,
  RelativeParent,
  SolutionsContainer,
  SolutionsDropdownText,
  SolutionsItem,
  TargetIcon,
  TimeIcon,
  Wrapper,
  WrapperBottomMenuItem,
  WrapperBottomMenuItemSolution
} from './styles'

import Dropdown from '../../Dropdown'

export default function BottomMenu() {
  const [isUp, setIsUp] = useState(false)

  return (
    <Menu>
      <Wrapper>
        <WrapperBottomMenuItem to="/">
          <TargetIcon />
          <BottomMenuText>Objetivos</BottomMenuText>
        </WrapperBottomMenuItem>
        <RelativeParent>
          <WrapperBottomMenuItemSolution onClick={() => setIsUp(!isUp)}>
            <AppsIcon />
            <BottomMenuText>Soluções</BottomMenuText>
            {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </WrapperBottomMenuItemSolution>
          <Dropdown isOpen={isUp} setOpen={setIsUp} width="300px">
            <SolutionsContainer>
              <SolutionsItem to="/cartao-credito">
                <IconCircle>
                  <CreditCardIcon />
                </IconCircle>
                <SolutionsDropdownText>Cartão de Crédito</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <HomeWithWindowIcon />
                </IconCircle>
                <SolutionsDropdownText>
                  Consórcio de Imóvel
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <CarIcon />
                </IconCircle>
                <SolutionsDropdownText>
                  Consórcio de Veículo
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <MoneyIcon />
                </IconCircle>
                <SolutionsDropdownText>
                  Financiamento de Veículo
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/investimentos">
                <IconCircle>
                  <BarChartIcon />
                </IconCircle>
                <SolutionsDropdownText>Investimentos</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <TimeIcon />
                </IconCircle>
                <SolutionsDropdownText>
                  Previdência Privada
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <PersonGroupIcon />
                </IconCircle>
                <SolutionsDropdownText>Seguro de Vida</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <PlaneIcon />
                </IconCircle>
                <SolutionsDropdownText>Seguro Viagem</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
            </SolutionsContainer>
          </Dropdown>
        </RelativeParent>
        <WrapperBottomMenuItem to="/">
          <GearIcon />
          <BottomMenuText>Gerenciador</BottomMenuText>
        </WrapperBottomMenuItem>
        <WrapperBottomMenuItem to="/pontos">
          <DiamondIcon />
          <BottomMenuText>Pontos</BottomMenuText>
        </WrapperBottomMenuItem>
        <WrapperBottomMenuItem to="/">
          <IdeaIcon />
          <BottomMenuText>Recomendações</BottomMenuText>
        </WrapperBottomMenuItem>
      </Wrapper>
    </Menu>
  )
}
