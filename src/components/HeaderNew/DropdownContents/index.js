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
} from './styles'

export function NotificationsContent(redirectAndCloseFunc) {
  const notificationsData = useSelector(state => state.notifications.data)

  return (
    <Container>
      <Content>
        {notificationsData.novas &&
          notificationsData.novas.map(notification => (
            <ItemWrapper padding="14px 14px 21px 14px">
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
          notificationsData.anteriores.map(notification => (
            <ItemWrapper padding="21px 14px">
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
        <Button onClick={() => redirectAndCloseFunc('/notificacoes')}>
          VER MAIS
        </Button>
      </Footer>
    </Container>
  )
}
