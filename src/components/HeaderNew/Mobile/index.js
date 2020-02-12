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

export default function Mobile({ items, setIsOpen, totalPoints }) {
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
    <Container data-gtm-type="container" data-gtm-name="Responsive - Header">
      <Content>
        <Header>
          <ConquistaBeta
            data-gtm-type="click"
            data-gtm-clicktype="Link"
            data-gtm-name="Responsive Header - Conquista Logo"
            onClick={() => closeAndRedirectHome()}
          />
          <ResponsiveMenu
            data-gtm-type="click"
            data-gtm-clicktype="Button"
            data-gtm-name="Responsive Header - Close Menu"
            onClick={() => setIsOpen(false)}
          >
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
                content: `${totalPoints} pontos`,
              },
            ]}
            gtmType="click"
            gtmClickType="link"
            gtmName="Responsive Header Menu - Perfil"
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
            gtmType="click"
            gtmClickType="link"
            gtmName="Responsive Header Menu - Novas notificações disponíveis"
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
                      gtmType="click"
                      gtmClickType="accordion"
                      gtmName={`Responsive Header Menu - Menu Produtos - ${item.text}`}
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
                      gtmType="click"
                      gtmClickType="link"
                      gtmName={`Responsive Header Menu - Menu Produtos - ${item.text} = ${child.text}`}
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
                gtmType="click"
                gtmClickType="link"
                gtmName={`Responsive Header Menu - Menu Produtos - ${item.text}`}
              />
            )
          })}
        </ProductsContainer>
      </Content>
      <Footer>
        <Button
          data-gtm-type="click"
          data-gtm-clicktype="Button"
          data-gtm-name="Responsive Header - SAIR"
          iconName="leave"
        >
          SAIR
        </Button>
      </Footer>
    </Container>
  )
}

export const mobileItemsPropTypes = PropTypes.arrayOf(
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
)

Mobile.propTypes = {
  items: mobileItemsPropTypes.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  totalPoints: PropTypes.string.isRequired,
}
