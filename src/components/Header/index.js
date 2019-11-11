import React, { useState } from 'react'

import {
  Container,
  TopMenu,
  Text,
  BlueText,
  Wrapper,
  WrapperMenuTop,
  Logo,
  RelativeParent,
  NotificationCircle,
  LinkText,
  BottomMenu,
  WrapperBottomMenuItem,
  AlertRoundedIcon,
  AppsIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  DiamondIcon,
  GearIcon,
  IdeaIcon,
  MenuIcon,
  RemoveIcon,
  TargetIcon,
  DropDownWrapper,
  DropDownContainer,
  TriangleHolder,
  DropDownTriangle,
  AddIcon,
  Backdrop,
  ResponsiveTextWrapper,
  ResponsiveWrapper,
  ResponsiveLogoWrapper,
  ThumbsUpIcon,
  IconCircle,
  CreditCardIcon,
  SolutionsItem,
  SolutionsContainer,
  HomeWithWindowIcon,
  CarIcon,
  MoneyIcon,
  BarChartIcon,
  TimeIcon,
  PersonGroupIcon,
  PlaneIcon,
  SolutionsDropdownText,
  BottomMenuText,
} from './styles'
import Button from '../Button'
import ResponsiveHeader from './ResponsiveHeader'
import Dropdown from '../Dropdown'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUp, setIsUp] = useState(false)

  return (
    <Container>
      <TopMenu>
        <WrapperMenuTop
          width="1200px"
          justify="space-between"
          margin="0px 120px"
        >
          <ResponsiveWrapper>
            <MenuIcon />
          </ResponsiveWrapper>
          <Wrapper justify="flex-start">
            <ResponsiveLogoWrapper>
              <Logo />
            </ResponsiveLogoWrapper>
            <LinkText to="/" exact size={20} margin="0px 20px">
              Início
            </LinkText>
            <LinkText to="/user" size={20} margin="0px 20px">
              Perfil
            </LinkText>
          </Wrapper>
          <Wrapper justify="flex-end">
            <RelativeParent>
              <DropDownWrapper isOpen={isOpen} top={30} left={-470}>
                <TriangleHolder>
                  <DropDownTriangle />
                </TriangleHolder>
                <DropDownContainer width={500} height={400}>
                  <Wrapper
                    padding="15px"
                    alignItems="flex-start"
                    bgcolor="#fff"
                    borderBottom="1px solid #c7c7c7"
                    cursorPointer
                  >
                    <Wrapper width="35px" alignItems="flex-start" cursorPointer>
                      <AddIcon />
                    </Wrapper>
                    <Wrapper
                      justify="flex-start"
                      flexDirection="column"
                      alignItems="flex-start"
                      padding="0px 5px"
                      cursorPointer
                    >
                      <Text
                        color="#33beff"
                        margin="0px 0px 14px 0px"
                        size={11}
                        fontWeight={600}
                        lineHeight="21px"
                        letterSpacing={1.5}
                        upperCase
                        cursorPointer
                      >
                        Confimação de aporte
                      </Text>
                      <Text
                        color="#1c1c1c"
                        size={14}
                        fontWeight={300}
                        lineHeight="24px"
                        textAlign="left"
                        cursorPointer
                      >
                        Está tudo certo com seu investimento no fundo [Nome do
                        fundo].
                      </Text>
                    </Wrapper>
                    <Wrapper width="35px" alignSelf="center" cursorPointer>
                      <AddIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding="15px"
                    alignItems="flex-start"
                    bgcolor="#fff"
                    borderBottom="1px solid #c7c7c7"
                    cursorPointer
                  >
                    <Wrapper width="35px" alignItems="flex-start" cursorPointer>
                      <RemoveIcon />
                    </Wrapper>
                    <Wrapper
                      justify="flex-start"
                      flexDirection="column"
                      alignItems="flex-start"
                      padding="0px 5px"
                      cursorPointer
                    >
                      <Text
                        color="#33beff"
                        margin="0px 0px 14px 0px"
                        size={11}
                        fontWeight={600}
                        lineHeight="21px"
                        letterSpacing={1.5}
                        upperCase
                        cursorPointer
                      >
                        Confimação de resgate
                      </Text>
                      <Text
                        color="#1c1c1c"
                        size={14}
                        fontWeight={300}
                        lineHeight="24px"
                        textAlign="left"
                        cursorPointer
                      >
                        Está tudo certo com seu resgate do fundo [Nome do
                        fundo].
                      </Text>
                    </Wrapper>
                    <Wrapper width="35px" alignSelf="center" cursorPointer>
                      <ArrowRightIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding="15px"
                    alignItems="flex-start"
                    bgcolor="#fff"
                    borderBottom="1px solid #c7c7c7"
                    cursorPointer
                  >
                    <Wrapper width="35px" alignItems="flex-start" cursorPointer>
                      <ThumbsUpIcon />
                    </Wrapper>
                    <Wrapper
                      justify="flex-start"
                      flexDirection="column"
                      alignItems="flex-start"
                      padding="0px 5px"
                      cursorPointer
                    >
                      <Text
                        color="#33beff"
                        margin="0px 0px 14px 0px"
                        size={11}
                        fontWeight={600}
                        lineHeight="21px"
                        letterSpacing={1.5}
                        upperCase
                        cursorPointer
                      >
                        Aviso de primeiro investimento no fundo
                      </Text>
                      <Text
                        color="#1c1c1c"
                        size={14}
                        fontWeight={300}
                        lineHeight="24px"
                        textAlign="left"
                        cursorPointer
                      >
                        Parabéns, seu primeiro investimento no fundo [Nome do
                        fundo] está confirmado!
                      </Text>
                    </Wrapper>
                    <Wrapper width="35px" alignSelf="center" cursorPointer>
                      <AddIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding="15px"
                    alignItems="flex-start"
                    bgcolor="#fff"
                    borderBottom="1px solid #c7c7c7"
                    cursorPointer
                  >
                    <Wrapper width="35px" alignItems="flex-start" cursorPointer>
                      <AlertRoundedIcon />
                    </Wrapper>
                    <Wrapper
                      justify="flex-start"
                      flexDirection="column"
                      alignItems="flex-start"
                      padding="0px 5px"
                      cursorPointer
                    >
                      <Text
                        color="#33beff"
                        margin="0px 0px 14px 0px"
                        size={11}
                        fontWeight={600}
                        lineHeight="21px"
                        letterSpacing={1.5}
                        upperCase
                        cursorPointer
                      >
                        Aviso de aplicação pendente de recurso
                      </Text>
                      <Text
                        color="#1c1c1c"
                        size={14}
                        fontWeight={300}
                        lineHeight="24px"
                        textAlign="left"
                        cursorPointer
                      >
                        Sua aplicação será feita assim que você depositar o
                        valor em sua conta Porto Seguro. Caso a quantia não
                        esteja disponível até as 15h, a aplicação será
                        cancelada.
                      </Text>
                    </Wrapper>
                    <Wrapper width="35px" alignSelf="center" cursorPointer>
                      <ArrowRightIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper padding="15px">
                    <Button to="/notifications">Ver Todos</Button>
                  </Wrapper>
                </DropDownContainer>
              </DropDownWrapper>

              <NotificationCircle>
                <Text size={10} cursorPointer>
                  {10}
                </Text>
              </NotificationCircle>
              <BellIcon className="maneiro" onClick={() => setIsOpen(!isOpen)} />
            </RelativeParent>
            <ResponsiveTextWrapper>
              <Text
                size={11}
                fontWeight={600}
                letterSpacing={1.5}
                upperCase
                margin="0px 20px"
                lineHeight={21}
              >
                Olá, Júlia.
              </Text>
              <BlueText>
                SAIR
              </BlueText>
            </ResponsiveTextWrapper>
          </Wrapper>
        </WrapperMenuTop>
      </TopMenu>
      <BottomMenu>
        <Wrapper width="1200px" justify="space-between">
          <WrapperBottomMenuItem>
            <TargetIcon />
            <BottomMenuText>
              Objetivos
            </BottomMenuText>
          </WrapperBottomMenuItem>
          <RelativeParent>
            <WrapperBottomMenuItem onClick={() => setIsUp(!isUp)}>
              <AppsIcon />
              <BottomMenuText>
                Soluções
              </BottomMenuText>
              {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </WrapperBottomMenuItem >
            <Dropdown isOpen={isUp} setOpen={setIsUp} width="300px">
              <SolutionsContainer>
                <SolutionsItem>
                  <IconCircle>
                    <CreditCardIcon />
                  </IconCircle>
                    <SolutionsDropdownText>Cartão de Crédito</SolutionsDropdownText>
                    <ArrowRightIcon size={11} />
                </SolutionsItem>
                <SolutionsItem>
                  <IconCircle>
                    <HomeWithWindowIcon />
                  </IconCircle>
                    <SolutionsDropdownText>Consórcio de Imóvel</SolutionsDropdownText>
                    <ArrowRightIcon size={11} />
                </SolutionsItem>
                <SolutionsItem>
                  <IconCircle>
                    <CarIcon />
                  </IconCircle>
                    <SolutionsDropdownText>Consórcio de Veículo</SolutionsDropdownText>
                    <ArrowRightIcon size={11} />
                </SolutionsItem>
                <SolutionsItem>
                  <IconCircle>
                    <MoneyIcon />
                  </IconCircle>
                    <SolutionsDropdownText>Financiamento de Veículo</SolutionsDropdownText>
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
                    <SolutionsDropdownText>Previdência Privada</SolutionsDropdownText>
                    <ArrowRightIcon size={11} />
                </SolutionsItem>
                <SolutionsItem>
                  <IconCircle>
                    <PersonGroupIcon />
                  </IconCircle>
                    <SolutionsDropdownText>Seguro de Vida</SolutionsDropdownText>
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
            <BottomMenuText>
              Gerenciador
            </BottomMenuText>
          </WrapperBottomMenuItem>
          <WrapperBottomMenuItem>
            <DiamondIcon />
            <BottomMenuText>
              Pontos
            </BottomMenuText>
          </WrapperBottomMenuItem>
          <WrapperBottomMenuItem>
            <IdeaIcon />
            <BottomMenuText>
              Recomendações
            </BottomMenuText>
          </WrapperBottomMenuItem>
        </Wrapper>
      </BottomMenu>
      {isOpen && <Backdrop onClick={() => setIsOpen(!isOpen)} />}
      <ResponsiveHeader />
    </Container>
  )
}
