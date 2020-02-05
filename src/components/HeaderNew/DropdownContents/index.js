import React from 'react'
import { useSelector } from 'react-redux'

import {
  Container,
  Content,
  Button,
  Footer,
  ItemWrapper,
  ItemIcon,
  ItemText,
  ItemHeader,
  ItemContent,
  NotFoundContainer,
} from './styles'

export function NotificationsContent(redirectAndCloseFunc) {
  const notificationsData = useSelector(state => state.notifications.data)

  return (
    <Container key={`nodeDropDownKey-${Math.random()}`}>
      <Content>
        {notificationsData.novas.length === 0 &&
          notificationsData.anteriores.length === 0 && (
            <NotFoundContainer>
              <ItemText type="headline" color="gray4">
                Você não possui notificações.
              </ItemText>
            </NotFoundContainer>
          )}

        {notificationsData.novas &&
          notificationsData.novas.map((notification, index) => (
            <ItemWrapper
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-name={`Dropdown notificacoes header - notificacao - ${notification.titulo}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`notificationNewKey-${index}`}
              padding="14px 14px 21px 14px"
            >
              <ItemHeader>
                <ItemIcon name="information" color="blue4" />
                <ItemText type="headline" color="blue4" margin="0 0 0 14px">
                  {notification.titulo}
                </ItemText>
              </ItemHeader>
              <ItemContent>
                <ItemText type="body" color="gray5">
                  {notification.textoConteudo}
                </ItemText>
              </ItemContent>
            </ItemWrapper>
          ))}
        {notificationsData.anteriores &&
          notificationsData.anteriores.map((notification, index) => (
            <ItemWrapper
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-name={`Dropdown notificacoes header - notificacao - ${notification.titulo}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`notificationOldKey-${index}`}
              padding="21px 14px"
            >
              <ItemHeader>
                <ItemIcon name="information" color="blue4" />
                <ItemText type="headline" color="blue4" margin="0 0 0 14px">
                  {notification.titulo}
                </ItemText>
              </ItemHeader>
              <ItemContent>
                <ItemText type="body" color="gray5">
                  {notification.textoConteudo}
                </ItemText>
              </ItemContent>
            </ItemWrapper>
          ))}
      </Content>
      <Footer>
        <Button
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="Dropdown notificacoes header - VER MAIS"
          onClick={() => redirectAndCloseFunc('/notificacoes')}
        >
          VER MAIS
        </Button>
      </Footer>
    </Container>
  )
}
