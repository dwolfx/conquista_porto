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
} from './styles'

import Dropdown from '../../Dropdown'

export default function BottomMenu() {

  const [isUp, setIsUp] = useState(false)

  return (
    <Menu>
      <Wrapper width="1200px" justify="space-between">
      <WrapperBottomMenuItem>
        <TargetIcon />
        <BottomMenuText>Objetivos</BottomMenuText>
      </WrapperBottomMenuItem>
      <RelativeParent>
        <WrapperBottomMenuItem onClick={() => setIsUp(!isUp)}>
          <AppsIcon />
          <BottomMenuText>Soluções</BottomMenuText>
          {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </WrapperBottomMenuItem>
        <Dropdown isOpen={isUp} setOpen={setIsUp} width="300px">
          <SolutionsContainer>
            <SolutionsItem>
              <IconCircle>
                <CreditCardIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Cartão de Crédito
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <HomeWithWindowIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Consórcio de Imóvel
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <CarIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Consórcio de Veículo
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <MoneyIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Financiamento de Veículo
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <BarChartIcon />
              </IconCircle>
              <SolutionsDropdownText>Investimentos</SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <TimeIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Previdência Privada
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <PersonGroupIcon />
              </IconCircle>
              <SolutionsDropdownText>
                Seguro de Vida
                    </SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
            <SolutionsItem>
              <IconCircle>
                <PlaneIcon />
              </IconCircle>
              <SolutionsDropdownText>Seguro Viagem</SolutionsDropdownText>
              <ArrowRightIcon size={11} />
            </SolutionsItem>
          </SolutionsContainer>
        </Dropdown>
      </RelativeParent>
      <WrapperBottomMenuItem>
        <GearIcon />
        <BottomMenuText>Gerenciador</BottomMenuText>
      </WrapperBottomMenuItem>
      <WrapperBottomMenuItem>
        <DiamondIcon />
        <BottomMenuText>Pontos</BottomMenuText>
      </WrapperBottomMenuItem>
      <WrapperBottomMenuItem>
        <IdeaIcon />
        <BottomMenuText>Recomendações</BottomMenuText>
      </WrapperBottomMenuItem>
    </Wrapper>
    </Menu>
  )
}