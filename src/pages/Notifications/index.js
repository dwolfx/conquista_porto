import React, { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import NotificationItem from 'components/NotificationItem'
import Breadcrumb from 'components/Breadcrumb'
import Configurations from './Configurations'

import {
  BreadcrumbContainer,
  GearBtnLink,
  GearIcon,
  Icon,
  LeftNav,
  ManageableItem,
  NotificationsBody,
  NotificationsMessages,
  NotificationsSection,
  NotificationsArticle,
  PageTitle,
  Text,
} from './styles'

const DBGerais = [
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
  {
    id: 5,
    title: 'Confirmação de Aporte',
    content: 'Está tudo certo com seu investimento no fundo [Nome do fundo].',
    identificationIcon: 'add',
    actionIcon: 'add',
    isRead: true,
  },
  {
    id: 6,
    title: 'Confirmação de Resgate',
    content: 'Está tudo certo com seu resgate do fundo [Nome do fundo].',
    identificationIcon: 'remove',
    actionIcon: 'arrowright',
    isRead: true,
  },
  {
    id: 7,
    title: 'Aviso de primeiro investimento no fundo',
    content:
      'Parabéns, seu primeiro investimento no fundo [Nome do fundo] está confirmado!',
    identificationIcon: 'thumbsup',
    actionIcon: 'add',
    isRead: false,
  },
  {
    id: 8,
    title: 'Aviso de aplicação pendente de recurso',
    content:
      'Sua aplicação será feita assim que você depositar o valor em sua conta Porto Seguro. Caso a quantia não esteja disponível até as 15h, a aplicação será cancelada.',
    identificationIcon: 'alertrounded',
    actionIcon: 'arrowright',
    isRead: false,
  },
]
const DBProduto = [
  {
    id: 9,
    title: 'Confirmação de Aporte',
    content: 'Está tudo certo com seu investimento no fundo [Nome do fundo].',
    identificationIcon: 'add',
    actionIcon: 'add',
    isRead: false,
  },
  {
    id: 10,
    title: 'Confirmação de Resgate',
    content: 'Está tudo certo com seu resgate do fundo [Nome do fundo].',
    identificationIcon: 'remove',
    actionIcon: 'arrowright',
    isRead: false,
  },
]

export default function Notifications() {
  const theme = useContext(ThemeContext)
  const [manageableItem, setManageableItem] = useState('Gerais')
  const [manageableDB, setManageableDB] = useState(DBGerais)
  const [isActiveGerais, setIsActiveGerais] = useState(true)
  const [isActiveProduto, setIsActiveProduto] = useState(false)

  function scrollPage(id) {
    const el = document.querySelector(`#${id}`).getBoundingClientRect()

    const windowScroll = window.pageYOffset
    /*
      200 = distance between sticky elements and top of the page.
    */
    const amountToScroll = Math.round(el.top + windowScroll - 205)

    window.scroll({
      top: amountToScroll,
      left: 0,
      behavior: 'smooth',
    })
  }

  function handleManageableItem(option) {
    if (option === 'Gerais') {
      setManageableItem('Gerais')
      setManageableDB(DBGerais)
      setIsActiveGerais(true)
      setIsActiveProduto(false)
      scrollPage('notificationId')
    } else {
      setManageableItem('Produto')
      setManageableDB(DBProduto)
      setIsActiveGerais(false)
      setIsActiveProduto(true)
      scrollPage('notificationId')
    }
  }

  return (
    <>
      <NotificationsBody>
        <BreadcrumbContainer>
          <Breadcrumb crumbs={['notificações']} />
        </BreadcrumbContainer>
        <NotificationsSection>
          <LeftNav>
            <GearBtnLink onClick={() => scrollPage('configurationId')}>
              <GearIcon />
              <Text type="paragraph" fontColor={theme.colors.gray5} upperCase>
                Configurações
              </Text>
            </GearBtnLink>
            <ManageableItem
              active={isActiveGerais}
              onClick={() => handleManageableItem('Gerais')}
            >
              <Icon name="gear" />
              <Text type="paragraph" paddingBottom="15px">
                Gerais
              </Text>
            </ManageableItem>
            <ManageableItem
              active={isActiveProduto}
              onClick={() => handleManageableItem('Produto')}
            >
              <Icon name="apps" />
              <Text type="paragraph" paddingBottom="15px">
                Produto
              </Text>
            </ManageableItem>
          </LeftNav>
          <NotificationsArticle id="notificationId">
            <PageTitle type="title3">{manageableItem}</PageTitle>
            <NotificationsMessages>
              {manageableDB.map(item => (
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
          </NotificationsArticle>
        </NotificationsSection>
      </NotificationsBody>
      <Configurations id="configurationId" />
    </>
  )
}
