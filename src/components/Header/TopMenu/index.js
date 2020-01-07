import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import NotificationItem from 'components/NotificationItem'
import {
  Backdrop,
  BlueText,
  BellIcon,
  Container,
  Dropdown,
  DropDownContainer,
  LinkText,
  LogoLinkWrapper,
  MenuIcon,
  NewNotificationsNumber,
  NotificationCircle,
  RelativeParent,
  ResponsiveTextWrapper,
  ResponsiveWrapper,
  Text,
  Wrapper,
  MainContainer,
} from './styles'

import ResponsiveHeader from '../ResponsiveHeader'
import ResponsiveNotifications from '../ResponsiveNotifications'

import Button from '../../Button'
import Logo from '../Logo'

const DB = [
  {
    id: 1,
    title: 'Confirmação de Aporte',
    content: 'Está tudo certo com seu investimento no fundo [Nome do fundo].',
    identificationIcon: 'add',
    actionIcon: 'add',
    isRead: true,
  },
  {
    id: 2,
    title: 'Confirmação de Resgate',
    content: 'Está tudo certo com seu resgate do fundo [Nome do fundo].',
    identificationIcon: 'remove',
    actionIcon: 'arrowright',
    isRead: true,
  },
  {
    id: 3,
    title: 'Aviso de primeiro investimento no fundo',
    content:
      'Parabéns, seu primeiro investimento no fundo [Nome do fundo] está confirmado!',
    identificationIcon: 'thumbsup',
    actionIcon: 'add',
    isRead: false,
  },
  {
    id: 4,
    title: 'Aviso de aplicação pendente de recurso',
    content:
      'Sua aplicação será feita assim que você depositar o valor em sua conta Porto Seguro. Caso a quantia não esteja disponível até as 15h, a aplicação será cancelada.',
    identificationIcon: 'alertrounded',
    actionIcon: 'arrowright',
    isRead: false,
  },
]

function TopMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isResponsiveOpen, setIsResponsiveOpen] = useState(false)
  const [
    isResponsiveNotificationOpen,
    setIsResponsiveNotificationOpen,
  ] = useState(false)
  const [breakpoint, setBreakpoint] = useState('')
  const history = useHistory()
  const theme = useContext(ThemeContext)

  const handleNotificationsRedirect = () => {
    setIsOpen(false)
    history.push('/notificacoes')
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  function handleResponsiveNotifications() {
    if (breakpoint === 'sm')
      setIsResponsiveNotificationOpen(!isResponsiveNotificationOpen)
    else setIsOpen(!isOpen)
  }
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
  useEffect(() => {
    const body = document.querySelector('body')
    if (isResponsiveOpen || isResponsiveNotificationOpen) {
      body.style.overflow = 'hidden'
    }

    function handleOverflow() {
      body.style.overflow = 'visible'
    }
    return () => handleOverflow()
  }, [isResponsiveOpen, isResponsiveNotificationOpen])

  return (
    <MainContainer>
      <Container>
        {breakpoint === 'sm' && (
          <ResponsiveHeader
            isOpen={isResponsiveOpen}
            setOpen={setIsResponsiveOpen}
          />
        )}
        {breakpoint === 'sm' && (
          <ResponsiveNotifications
            isOpen={isResponsiveNotificationOpen}
            setOpen={setIsResponsiveNotificationOpen}
          />
        )}
        <ResponsiveWrapper>
          <MenuIcon onClick={() => setIsResponsiveOpen(!isResponsiveOpen)} />
        </ResponsiveWrapper>
        <LogoLinkWrapper>
          <Logo />
          <LinkText to="/" exact size={20} margin="0px 20px">
            Início
          </LinkText>
          <LinkText to="/perfil" size={20} margin="0px 20px">
            Perfil
          </LinkText>
        </LogoLinkWrapper>
        <Wrapper justify="flex-end">
          <RelativeParent>
            <Dropdown isOpen={isOpen} setOpen={setIsOpen} width="500px">
              <DropDownContainer isRead={DB[0].isRead}>
                {DB.map(item => (
                  <NotificationItem
                    key={item.id}
                    title={item.title}
                    message={item.content}
                    identificationIcon={item.identificationIcon}
                    actionIcon={item.actionIcon}
                    isRead={item.isRead}
                  />
                ))}
                {history.location.pathname !== '/notificacoes' && (
                  <Wrapper padding="15px">
                    <Button onClick={handleNotificationsRedirect} outline>
                      Ver Todas
                    </Button>
                  </Wrapper>
                )}
              </DropDownContainer>
            </Dropdown>
            {history.location.pathname === '/notificacoes' ? (
              <BellIcon
                onClick={() => handleResponsiveNotifications()}
                fill={theme.colors.blue4}
              />
            ) : (
              <>
                <NotificationCircle>
                  <NewNotificationsNumber>{10}</NewNotificationsNumber>
                </NotificationCircle>
                <BellIcon
                  onClick={() => handleResponsiveNotifications()}
                  fill={theme.colors.white}
                />
              </>
            )}
          </RelativeParent>
          <ResponsiveTextWrapper>
            <Text>Olá, Júlia.</Text>
            <BlueText>SAIR</BlueText>
          </ResponsiveTextWrapper>
        </Wrapper>
      </Container>
      {isOpen && <Backdrop onClick={() => setIsOpen(!isOpen)} />}
    </MainContainer>
  )
}

export default TopMenu
