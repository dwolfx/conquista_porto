import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button/IconText'
import ListItem from 'components/ListItem'
import { IChildSecondProp, IItemsProps } from 'components/Dropdown/interface'

import {
  Container,
  ProfileContainer,
  ProductsContainer,
  Header,
  Footer,
  Content,
  ConquistaBeta,
  ResponsiveMenu,
  AvatarIcon,
  Icon,
} from './styles'

interface IProps {
  items: IItemsProps[]
  totalPoints?: string | boolean
  setIsOpen: (isOpen: boolean) => void
  exitFunc: () => void
  customerName: string
}

export default function Mobile({
  items,
  setIsOpen,
  totalPoints,
  exitFunc,
  customerName,
  ...rest
}: IProps) {
  const history = useHistory()

  useEffect(() => {
    const html = document.querySelector('html')
    html && html.classList.add('noOverflow')

    return () => {
      html && html.classList.remove('noOverflow')
    }
  }, [])

  function closeAndRedirectHome() {
    history.push('/')
    setIsOpen(false)
  }

  return (
    <Container {...rest} data-testid="header-mobile-hamburguer">
      <Content>
        <Header>
          <ConquistaBeta
            data-testid="conquista-logo"
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="responsive header"
            data-gtm-name="conquista logo"
            onClick={() => closeAndRedirectHome()}
          />
          <ResponsiveMenu
            data-testid="fechar-menu"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="responsive header"
            data-gtm-name="fechar menu"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="close" />
          </ResponsiveMenu>
        </Header>
        <ProfileContainer>
          <ListItem
            data-testid="perfil"
            StartIcon={AvatarIcon}
            text={[
              {
                type: 'headline',
                color: 'gray6',
                content: customerName,
              },
              {
                type: 'caption',
                color: 'blue4',
                content: `${totalPoints} pontos`,
              },
            ]}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="responsive header menu"
            data-gtm-name="perfil"
            path="perfil"
            callbackClickFn={() => setIsOpen(false)}
          />
        </ProfileContainer>
        <ProductsContainer>
          {items.map((item: IItemsProps) => {
            if (item.children) {
              return item.children.map((child: IChildSecondProp) => (
                <ListItem
                  key={`menu-item-${child.icon}`}
                  StartIcon={<Icon name={child.icon} color="gray5" />}
                  text={[
                    {
                      type: 'headline',
                      color: 'gray6',
                      content: child.text ?? '',
                    },
                  ]}
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="responsive header menu"
                  data-gtm-name={child.text}
                  path={child.path}
                  callbackClickFn={() => setIsOpen(false)}
                />
              ))
            } else {
              return (
                <ListItem
                  data-testid="responsive-header-menu"
                  key={`accordion-last-item-${item.icon}`}
                  StartIcon={<Icon name={item.icon} color="gray5" />}
                  text={[
                    {
                      type: 'headline',
                      color: 'gray6',
                      content: item.text ?? '',
                    },
                  ]}
                  path={item.path}
                  callbackClickFn={() => setIsOpen(false)}
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="responsive header menu"
                  data-gtm-name={item.text}
                />
              )
            }
          })}
        </ProductsContainer>
      </Content>
      <Footer>
        <Button
          data-testid="sair"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="responsive header"
          data-gtm-name="sair"
          iconName="leave"
          onClick={exitFunc}
        >
          SAIR
        </Button>
      </Footer>
    </Container>
  )
}
