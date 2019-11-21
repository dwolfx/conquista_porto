import React, { useState } from 'react'

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
  WrapperBottomMenuItem,
  WrapperBottomMenuItemSolution,
} from './styles'

import Dropdown from '../../Dropdown'

export default function BottomMenu() {
  const [isUp, setIsUp] = useState(false)

  return (
    <Menu>
      <Wrapper>
        <WrapperBottomMenuItem to="/">
          <BasicIcon name="target" />
          <BottomMenuText>Objetivos</BottomMenuText>
        </WrapperBottomMenuItem>
        <RelativeParent>
          <WrapperBottomMenuItemSolution onClick={() => setIsUp(!isUp)}>
            <BasicIcon name="apps" />
            <BottomMenuText>Soluções</BottomMenuText>
            {isUp ? (
              <ArrowUpDownIcon name="arrowup" />
            ) : (
              <ArrowUpDownIcon name="arrowdown" />
            )}
          </WrapperBottomMenuItemSolution>
          <Dropdown isOpen={isUp} setOpen={setIsUp} width="300px">
            <SolutionsContainer>
              <SolutionsItem to="/cartao-credito">
                <IconCircle>
                  <BottomMenuDropdownIcon name="creditcard" />
                </IconCircle>
                <SolutionsDropdownText>Cartão de Crédito</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/consorcio-imovel">
                <IconCircle>
                  <BottomMenuDropdownIcon name="homewithwindow" />
                </IconCircle>
                <SolutionsDropdownText>
                  Consórcio de Imóvel
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/consorcio-veiculo">
                <IconCircle>
                  <BottomMenuDropdownIcon name="car" />
                </IconCircle>
                <SolutionsDropdownText>
                  Consórcio de Veículo
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <BottomMenuDropdownIcon name="money" />
                </IconCircle>
                <SolutionsDropdownText>
                  Financiamento de Veículo
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/investimentos">
                <IconCircle>
                  <BottomMenuDropdownIcon name="barchart" />
                </IconCircle>
                <SolutionsDropdownText>Investimentos</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <BottomMenuDropdownIcon name="time" />
                </IconCircle>
                <SolutionsDropdownText>
                  Previdência Privada
                </SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <BottomMenuDropdownIcon name="persongroup" />
                </IconCircle>
                <SolutionsDropdownText>Seguro de Vida</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
              <SolutionsItem to="/">
                <IconCircle>
                  <BottomMenuDropdownIcon name="plane" />
                </IconCircle>
                <SolutionsDropdownText>Seguro Viagem</SolutionsDropdownText>
                <ArrowRightIcon size={11} />
              </SolutionsItem>
            </SolutionsContainer>
          </Dropdown>
        </RelativeParent>
        <WrapperBottomMenuItem to="/">
          <BasicIcon name="gear" />
          <BottomMenuText>Gerenciador</BottomMenuText>
        </WrapperBottomMenuItem>
        <WrapperBottomMenuItem to="/pontos">
          <BasicIcon name="diamond" />
          <BottomMenuText>Pontos</BottomMenuText>
        </WrapperBottomMenuItem>
        <WrapperBottomMenuItem to="/">
          <BasicIcon name="idea" />
          <BottomMenuText>Recomendações</BottomMenuText>
        </WrapperBottomMenuItem>
      </Wrapper>
    </Menu>
  )
}
