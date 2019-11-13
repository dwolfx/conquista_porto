import React, { useState, useEffect } from 'react'

import {
  AddIcon,
  AlertRoundedIcon,
  ArrowRightIcon,
  Backdrop,
  BlueText,
  BellIcon,
  Container,
  DropDownContainer,
  DropDownTriangle,
  DropDownWrapper,
  LinkText,
  MenuIcon,
  NotificationCircle,
  RelativeParent,
  ResponsiveTextWrapper,
  ResponsiveWrapper,
  RemoveIcon,
  ThumbsUpIcon,
  Text,
  TriangleHolder,
  Wrapper
} from './styles'

import ResponsiveHeader from '../ResponsiveHeader'

import Button from '../../Button'
import Logo from '../Logo'

const DB = [
  {
    id: 1,
    title: 'Confirmação de Aporte',
    content: 'Está tudo certo com seu investimento no fundo [Nome do fundo].',
    identificationIcon: 'addFunds',
    actionIcon: 'details'
  },
  {
    id: 2,
    title: 'Confirmação de Resgate',
    content: 'Está tudo certo com seu resgate do fundo [Nome do fundo].',
    identificationIcon: 'withdrawFunds',
    actionIcon: 'redirect'
  },
  {
    id: 3,
    title: 'Aviso de primeiro investimento no fundo',
    content:
      'Parabéns, seu primeiro investimento no fundo [Nome do fundo] está confirmado!',
    identificationIcon: 'notification',
    actionIcon: 'details'
  },
  {
    id: 4,
    title: 'Aviso de aplicação pendente de recurso',
    content:
      'Sua aplicação será feita assim que você depositar o valor em sua conta Porto Seguro. Caso a quantia não esteja disponível até as 15h, a aplicação será cancelada.',
    identificationIcon: 'warning',
    actionIcon: 'redirect'
  }
]

const Icon = ({ name }) => {
  let CompIcon = null
  switch (name) {
    case 'addFunds':
    case 'details':
      CompIcon = <AddIcon />
      break
    case 'withdrawFunds':
      CompIcon = <RemoveIcon />
      break
    case 'notification':
      CompIcon = <ThumbsUpIcon />
      break
    case 'warning':
      CompIcon = <AlertRoundedIcon />
      break
    case 'redirect':
      CompIcon = <ArrowRightIcon />
      break
    default:
      break
  }
  return CompIcon
}

export default function TopMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isResponsiveOpen, setIsResponsiveOpen] = useState(false)
  const [breakpoint, setBreakpoint] = useState('')

  function checkResolution() {
    const windowWidth = window.innerWidth
    setBreakpoint(windowWidth <= 989 ? 'sm' : 'lg')
  }

  useEffect(() => {
    checkResolution()
    window.addEventListener('resize', checkResolution)

    return function unMount() {
      window.removeEventListener('resize', checkResolution)
    }
  }, [])

  return (
    <>
      <Container>
        {breakpoint === 'sm' && (
          <ResponsiveHeader
            isOpen={isResponsiveOpen}
            setOpen={setIsResponsiveOpen}
          />
        )}
        <ResponsiveWrapper>
          <MenuIcon onClick={() => setIsResponsiveOpen(!isResponsiveOpen)} />
        </ResponsiveWrapper>
        <Wrapper justify="flex-start">
          <Logo />

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
                {DB.map(item => (
                  <Wrapper
                    padding="15px"
                    alignItems="flex-start"
                    bgcolor="#fff"
                    borderBottom="1px solid #c7c7c7"
                    cursorPointer
                    key={item.id}
                  >
                    <Wrapper width="35px" alignItems="flex-start" cursorPointer>
                      <Icon name={item.identificationIcon} />
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
                        {item.title}
                      </Text>
                      <Text
                        color="#1c1c1c"
                        size={14}
                        fontWeight={300}
                        lineHeight="24px"
                        textAlign="left"
                        cursorPointer
                      >
                        {item.content}
                      </Text>
                    </Wrapper>
                    <Wrapper width="35px" alignSelf="center" cursorPointer>
                      <Icon name={item.actionIcon} />
                    </Wrapper>
                  </Wrapper>
                ))}
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
            <BellIcon onClick={() => setIsOpen(!isOpen)} />
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
            <BlueText>SAIR</BlueText>
          </ResponsiveTextWrapper>
        </Wrapper>
      </Container>
      {isOpen && <Backdrop onClick={() => setIsOpen(!isOpen)} />}
    </>
  )
}
