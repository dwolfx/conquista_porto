import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import NotificationItem from 'components/NotificationItem'
import TextComponent from 'components/Text'
import Modal from 'components/Modal'

import useFetchNotifications from 'hooks/Notifications/useFetchNotifications'
import { SendNotificationReadRequest } from 'store/modules/Notifications/action'

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
  ModalContent,
} from './styles'

import ResponsiveHeader from '../ResponsiveHeader'
import ResponsiveNotifications from '../ResponsiveNotifications'

import Button from '../../Button'
import Logo from '../Logo'

function TopMenu() {
  useFetchNotifications()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState({
    open: false,
    selectedData: null,
  })
  const [isResponsiveOpen, setIsResponsiveOpen] = useState(false)
  const [
    isResponsiveNotificationOpen,
    setIsResponsiveNotificationOpen,
  ] = useState(false)
  const [breakpoint, setBreakpoint] = useState('')

  const data = useSelector(state => ({
    newNotifications: state.notifications.data.novas.length,
    notifications: [
      ...state.notifications.data.novas,
      ...state.notifications.data.anteriores,
    ],
  }))

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
    <>
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
                <DropDownContainer>
                  {data.notifications.map(item => (
                    <NotificationItem
                      key={item.idNotificacao}
                      title={item.titulo}
                      message={item.textoConteudo}
                      onClick={() => {
                        if (!item.lida) {
                          dispatch(
                            SendNotificationReadRequest(
                              item.idNotificacao,
                              '36275312807'
                            )
                          )
                        }
                        if (!item.link) {
                          setModalData({ open: true, selectedData: item })
                        }
                      }}
                      identificationIcon={
                        item.icon === 'ALERT' ? 'alertrounded' : 'add'
                      }
                      actionIcon={item.link ? 'arrowright' : 'add'}
                      isRead={item.lida}
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
                  {data.newNotifications ? (
                    <NotificationCircle onClick={handleResponsiveNotifications}>
                      <NewNotificationsNumber>
                        {data.newNotifications}
                      </NewNotificationsNumber>
                    </NotificationCircle>
                  ) : null}
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
      <Modal
        isOpen={modalData.open}
        modalTitle={modalData.selectedData && modalData.selectedData.titulo}
        handleClose={() => setModalData({ open: false, selectedData: null })}
      >
        <ModalContent>
          <TextComponent type="body">
            {modalData.selectedData && modalData.selectedData.titulo}
          </TextComponent>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TopMenu
