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
} from './styles';
import Button from '../Button';
import ResponsiveHeader from './ResponsiveHeader'

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [isUp, setIsUp] = useState(false);

  return (
    <Container>
      <TopMenu>
        <WrapperMenuTop width={'1200px'} justify={'space-between'} margin={'0px 120px'}>
          <ResponsiveWrapper>
            <MenuIcon />
          </ResponsiveWrapper>
          <Wrapper justify='flex-start'>
            <ResponsiveLogoWrapper>
              <Logo />
            </ResponsiveLogoWrapper>
            <LinkText to='/' exact size={20} margin={'0px 20px'}>{'Início'}</LinkText>
            <LinkText to='/user' size={20} margin={'0px 20px'}>{'Perfil'}</LinkText>
          </Wrapper>
          <Wrapper justify='flex-end'>
            <RelativeParent>
              <DropDownWrapper isOpen={isOpen} top={30} left={-470}>
                <TriangleHolder>
                  <DropDownTriangle />
                </TriangleHolder>
                <DropDownContainer width={500} height={400}>
                  <Wrapper
                    padding={'15px'}
                    alignItems={'flex-start'}
                    bgcolor={'#fff'}
                    borderBottom={'1px solid #c7c7c7'}
                    cursorPointer={true}>
                    <Wrapper width={'35px'} alignItems={'flex-start'} cursorPointer={true}>
                      <AddIcon />
                    </Wrapper>
                    <Wrapper justify={'flex-start'} flexDirection={'column'} alignItems={'flex-start'} padding={'0px 5px'} cursorPointer={true}>
                      <Text
                        color={'#33beff'}
                        margin={'0px 0px 14px 0px'}
                        size={11}
                        fontWeight={600}
                        lineHeight={'21px'}
                        letterSpacing={1.5}
                        upperCase={true}
                        cursorPointer={true}>Confimação de aporte</Text>
                      <Text
                        color={'#1c1c1c'}
                        size={14}
                        fontWeight={300}
                        lineHeight={'24px'}
                        textAlign={'left'}
                        cursorPointer={true}>Está tudo certo com seu investimento no fundo [Nome do fundo].</Text>
                    </Wrapper>
                    <Wrapper width={'35px'} alignSelf={"center"} cursorPointer={true}>
                      <AddIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding={'15px'}
                    alignItems={'flex-start'}
                    bgcolor={'#fff'}
                    borderBottom={'1px solid #c7c7c7'}
                    cursorPointer={true}>
                    <Wrapper width={'35px'} alignItems={'flex-start'} cursorPointer={true}>
                      <RemoveIcon />
                    </Wrapper>
                    <Wrapper justify={'flex-start'} flexDirection={'column'} alignItems={'flex-start'} padding={'0px 5px'} cursorPointer={true}>
                      <Text
                        color={'#33beff'}
                        margin={'0px 0px 14px 0px'}
                        size={11}
                        fontWeight={600}
                        lineHeight={'21px'}
                        letterSpacing={1.5}
                        upperCase={true}
                        cursorPointer={true}>Confimação de resgate</Text>
                      <Text
                        color={'#1c1c1c'}
                        size={14}
                        fontWeight={300}
                        lineHeight={'24px'}
                        textAlign={'left'}
                        cursorPointer={true}>Está tudo certo com seu resgate do fundo [Nome do fundo].</Text>
                    </Wrapper>
                    <Wrapper width={'35px'} alignSelf={"center"} cursorPointer={true}>
                      <ArrowRightIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding={'15px'}
                    alignItems={'flex-start'}
                    bgcolor={'#fff'}
                    borderBottom={'1px solid #c7c7c7'}
                    cursorPointer={true}>
                    <Wrapper width={'35px'} alignItems={'flex-start'} cursorPointer={true}>
                      <ThumbsUpIcon />
                    </Wrapper>
                    <Wrapper justify={'flex-start'} flexDirection={'column'} alignItems={'flex-start'} padding={'0px 5px'} cursorPointer={true}>
                      <Text
                        color={'#33beff'}
                        margin={'0px 0px 14px 0px'}
                        size={11}
                        fontWeight={600}
                        lineHeight={'21px'}
                        letterSpacing={1.5}
                        upperCase={true}
                        cursorPointer={true}>Aviso de primeiro investimento no fundo</Text>
                      <Text
                        color={'#1c1c1c'}
                        size={14}
                        fontWeight={300}
                        lineHeight={'24px'}
                        textAlign={'left'}
                        cursorPointer={true}>Parabéns, seu primeiro investimento no fundo [Nome do fundo] está confirmado!</Text>
                    </Wrapper>
                    <Wrapper width={'35px'} alignSelf={"center"} cursorPointer={true}>
                      <AddIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    padding={'15px'}
                    alignItems={'flex-start'}
                    bgcolor={'#fff'}
                    borderBottom={'1px solid #c7c7c7'}
                    cursorPointer={true}>
                    <Wrapper width={'35px'} alignItems={'flex-start'} cursorPointer={true}>
                      <AlertRoundedIcon />
                    </Wrapper>
                    <Wrapper justify={'flex-start'} flexDirection={'column'} alignItems={'flex-start'} padding={'0px 5px'} cursorPointer={true}>
                      <Text
                        color={'#33beff'}
                        margin={'0px 0px 14px 0px'}
                        size={11}
                        fontWeight={600}
                        lineHeight={'21px'}
                        letterSpacing={1.5}
                        upperCase={true}
                        cursorPointer={true}>Aviso de aplicação pendente de recurso</Text>
                      <Text
                        color={'#1c1c1c'}
                        size={14}
                        fontWeight={300}
                        lineHeight={'24px'}
                        textAlign={'left'}
                        cursorPointer={true}>Sua aplicação será feita assim que você depositar o valor em sua conta Porto Seguro. Caso a quantia não esteja disponível até as 15h, a aplicação será cancelada.</Text>
                    </Wrapper>
                    <Wrapper width={'35px'} alignSelf={"center"} cursorPointer={true}>
                      <ArrowRightIcon />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper padding={'15px'} >
                    <Button to='/notifications'>Ver Todos</Button>
                  </Wrapper>
                </DropDownContainer>
              </DropDownWrapper>

              <NotificationCircle >
                <Text size={10} cursorPointer={true} >{10}</Text>
              </NotificationCircle>
              <BellIcon onClick={(e) => setIsOpen(!isOpen)} />
            </RelativeParent>
            <ResponsiveTextWrapper>
              <Text
                size={11}
                fontWeight={600}
                letterSpacing={1.5}
                upperCase={true}
                margin={'0px 20px'}
                lineHeight={21}>
                {'Olá, Júlia.'}
              </Text>
              <BlueText
                size={11}
                color={'#33beff'}>
                {'SAIR'}
              </BlueText>
            </ResponsiveTextWrapper>
          </Wrapper>
        </WrapperMenuTop>
      </TopMenu>
      <BottomMenu>
        <Wrapper width={'1200px'} justify={'space-between'}>
          <WrapperBottomMenuItem>
            <TargetIcon />
            <Text
              size={14}
              fontWeight={600}
              letterSpacing={2}
              upperCase={true}
              cursorPointer={true}
              color={'#000'}>
              {'Objetivos'}
            </Text>
          </WrapperBottomMenuItem>
          <RelativeParent>
            {/* <DropDownContainer>

            </DropDownContainer> */}
            <WrapperBottomMenuItem onClick={(e) => setIsUp(!isUp)}>
              <AppsIcon />
              <Text
                size={14}
                fontWeight={600}
                letterSpacing={2}
                upperCase={true}
                cursorPointer={true}
                color={'#000'}>
                {'Soluções'}
              </Text>
              {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </WrapperBottomMenuItem>
          </RelativeParent>
          <WrapperBottomMenuItem>
            <GearIcon />
            <Text
              size={14}
              fontWeight={600}
              letterSpacing={2}
              upperCase={true}
              cursorPointer={true}
              color={'#000'}>
              {'Gerenciador'}
            </Text>
          </WrapperBottomMenuItem>
          <WrapperBottomMenuItem>
            <DiamondIcon />
            <Text
              hover={'true'}
              size={14}
              fontWeight={600}
              letterSpacing={2}
              upperCase={true}
              cursorPointer={true}
              color={'#000'}>
              {'Pontos'}
            </Text>
          </WrapperBottomMenuItem>
          <WrapperBottomMenuItem>
            <IdeaIcon />
            <Text
              size={14}
              fontWeight={600}
              letterSpacing={2}
              upperCase={true}
              cursorPointer={true}
              color={'#000'}>
              {'Recomendações'}
            </Text>
          </WrapperBottomMenuItem>
        </Wrapper>
      </BottomMenu>
      {isOpen && <Backdrop onClick={() => setIsOpen(!isOpen)} />}
      <ResponsiveHeader />
    </Container>
  )
}
