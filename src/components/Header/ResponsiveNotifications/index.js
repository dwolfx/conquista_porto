import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import NotificationItem from 'components/NotificationItem'
import Button from 'components/Button'

import {
  ButtonWrapper,
  CloseIcon,
  CloseIconWrapper,
  Wrapper,
  GridCol,
  GridContainer,
  GridRow,
  NotificationsMessages,
  ResponsiveContainer,
} from './styles'

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

const ResponsiveNotifications = ({ isOpen, setOpen }) => {
  const history = useHistory()

  const handleNotificationsRedirect = () => {
    history.push('/notificacoes')
    setOpen(false)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <ResponsiveContainer isOpen={isOpen}>
      <GridContainer>
        <GridRow>
          <GridCol lg="12">
            <Wrapper>
              <GridRow className="closeButton">
                <CloseIconWrapper>
                  <CloseIcon onClick={() => setOpen(false)} />
                </CloseIconWrapper>
              </GridRow>
              <GridRow className="overflowContent">
                <NotificationsMessages>
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
                </NotificationsMessages>
              </GridRow>
              <GridRow className="footer">
                <ButtonWrapper>
                  <Button onClick={handleNotificationsRedirect} outline>
                    Ver Todas
                  </Button>
                </ButtonWrapper>
              </GridRow>
            </Wrapper>
          </GridCol>
        </GridRow>
      </GridContainer>
    </ResponsiveContainer>
  )
}

export default ResponsiveNotifications

ResponsiveNotifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}
