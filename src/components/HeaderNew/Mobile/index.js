import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from 'components/Button/IconText'
import Accordion from 'components/Accordion'
import ListItem from 'components/ListItem'
import {
  Container,
  ProfileContainer,
  NotificationContainer,
  ProductsContainer,
  Header,
  Footer,
  Content,
  ConquistaBeta,
  ResponsiveMenu,
  AvatarIcon,
  NotificationBellIcon,
  Icon,
} from './styles'

export default function Mobile({ items, setIsOpen }) {
  const history = useHistory()
  const bankData = useSelector(
    state => state.bankData.data && state.bankData.data.DadosContaPortoSeguro
  )

  useEffect(() => {
    const html = document.querySelector('html')
    html.classList.add('noOverflow')

    return () => {
      html.classList.remove('noOverflow')
    }
  }, [])

  function closeAndRedirectHome() {
    history.push('/')
    setIsOpen(false)
  }

  return (
    <Container>
      <Content>
        <Header>
          <ConquistaBeta onClick={() => closeAndRedirectHome()} />
          <ResponsiveMenu onClick={() => setIsOpen(false)}>
            <Icon name="close" />
          </ResponsiveMenu>
        </Header>
        <ProfileContainer>
          <ListItem
            StartIcon={AvatarIcon}
            text={[
              {
                type: 'headline',
                color: 'gray6',
                content: bankData && bankData.titular,
              },
              {
                type: 'caption',
                color: 'blue4',
                content: '4.200 pontos',
              },
            ]}
            path="/perfil"
            callbackClickFn={() => setIsOpen(false)}
          />
        </ProfileContainer>
        <NotificationContainer>
          <ListItem
            StartIcon={NotificationBellIcon}
            text={[
              {
                type: 'headline',
                color: 'blue4',
                content: 'Novas notificações disponíveis',
              },
            ]}
            path="/notificacoes"
            callbackClickFn={() => setIsOpen(false)}
          />
        </NotificationContainer>
        <ProductsContainer>
          {items.map(item => {
            const startIcon = <Icon name={item.icon} color="gray5" />

            if (item.children) {
              return (
                <Accordion
                  titleNode={
                    <ListItem
                      StartIcon={startIcon}
                      text={[
                        {
                          type: 'headline',
                          color: 'gray6',
                          content: item.text,
                        },
                      ]}
                    />
                  }
                  noBackground
                  isGrayArrow
                  noBodyPadding
                  padding="0px"
                >
                  {item.children.map(child => (
                    <ListItem
                      text={[
                        {
                          type: 'headline',
                          color: 'gray5',
                          content: child.text,
                        },
                      ]}
                      path={child.path}
                      callbackClickFn={() => setIsOpen(false)}
                    />
                  ))}
                </Accordion>
              )
            }

            return (
              <ListItem
                StartIcon={startIcon}
                text={[
                  {
                    type: 'headline',
                    color: 'gray6',
                    content: item.text,
                  },
                ]}
                path={item.path}
                callbackClickFn={() => setIsOpen(false)}
              />
            )
          })}
        </ProductsContainer>
      </Content>
      <Footer>
        <Button iconName="leave">SAIR</Button>
      </Footer>
    </Container>
  )
}

Mobile.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      path: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string,
          text: PropTypes.string,
          path: PropTypes.string,
        })
      ),
    })
  ),
  setIsOpen: PropTypes.func,
}
