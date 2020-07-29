import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button/IconText'
import ListItem from 'components/ListItem'
import AccordionNew from 'components/AccordionNew'
import { IItemsProps } from 'components/DropdownNew'

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
    html?.classList.add('noOverflow')

    return () => {
      html?.classList.remove('noOverflow')
    }
  }, [])

  function closeAndRedirectHome() {
    history.push('/')
    setIsOpen(false)
  }

  return (
    <Container {...rest}>
      <Content>
        <Header>
          <ConquistaBeta
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="responsive header"
            data-gtm-name="conquista logo"
            onClick={() => closeAndRedirectHome()}
          />
          <ResponsiveMenu
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
          {items.map((item: any) => {
            const startIcon = <Icon name={item.icon} color="gray5" />

            if (item.children) {
              return (
                <AccordionNew
                  key={`accordion-item-${item.icon}`}
                  openByDefault={false}
                  triggerCloseOnArrow
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
                      data-gtm-type="click"
                      data-gtm-clicktype="accordion"
                      data-gtm-subname="responsive header menu"
                      data-gtm-name={item.text}
                    />
                  }
                >
                  {item.children.map((child: any) => (
                    <ListItem
                      key={`accordion-child-item-${child.icon}`}
                      text={[
                        {
                          type: 'headline',
                          color: 'gray5',
                          content: child.text,
                        },
                      ]}
                      path={child.path}
                      callbackClickFn={() => setIsOpen(false)}
                      data-gtm-type="click"
                      data-gtm-clicktype="link"
                      data-gtm-subname="menu produtos"
                      data-gtm-name={child.text}
                    />
                  ))}
                </AccordionNew>
              )
            }

            return (
              <ListItem
                key={`accordion-last-item-${item.icon}`}
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
                data-gtm-type="click"
                data-gtm-clicktype="link"
                data-gtm-subname="responsive header menu"
                data-gtm-name={item.text}
              />
            )
          })}
        </ProductsContainer>
      </Content>
      <Footer>
        <Button
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
