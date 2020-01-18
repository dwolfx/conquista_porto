import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import LinkText from './LinkText'
import {
  BorderTop,
  GridContainer,
  GridRow,
  GridCol,
  ListWrapper,
  Logo,
  LogoText,
  LogoTitle,
  Text,
  Title,
  UppercaseBlueText,
} from './styles'

const content1 = [
  <Title bold>CENTRAL DE ATENDIMENTO</Title>,
  <LinkText hrefValue="tel:(11) 3366 3370">(11) 3366 3370</LinkText>,
]
const content2 = [
  <Title>ATENDIMENTO PARA DEFICIENTES AUDITIVOS</Title>,
  <LinkText hrefValue="tel:0800 727 8736">0800 727 8736</LinkText>,
]
const content3 = [
  <Title>SAC</Title>,
  <LinkText hrefValue="tel:0800 727 2763">0800 727 2763</LinkText>,
]
const content4 = [
  <Title>MENSAGENS</Title>,
  <LinkText hrefValue="mailto:porto.investimentos@portoseguro.com.br">
    porto.investimentos@portoseguro.com.br
  </LinkText>,
]
const content5 = [
  <Title>OUVIDORIA</Title>,
  <HorizontalList
    heightSize="dynamic"
    noPadding
    startItems={[
      <LinkText hrefValue="tel:0800 727 1184">0800 727 1184</LinkText>,
      <LinkText hrefValue="tel:(11) 3366 3184">(11) 3366 3184</LinkText>,
    ]}
  />,
  <LinkText hrefValue="mailto:ouvidoria@portoseguro.com.br">
    ouvidoria@portoseguro.com.br
  </LinkText>,
]
const content6 = [
  <LogoTitle>UMA PLATAFORMA</LogoTitle>,
  <Logo />,
  <Link to="/">
    <UppercaseBlueText>POLÍTICA DE PRIVACIDADE</UppercaseBlueText>
  </Link>,
]
const content7 = [
  <LogoText>
    Atendimento de segunda a sexta,
    <br />
    das 8h15 às 18h30, exceto feriados.
  </LogoText>,
]

const Footer = () => {
  const [breakpoint, setBreakpoint] = useState('')
  function checkResolution() {
    const windowWidth = window.innerWidth
    setBreakpoint(windowWidth <= 480 ? 'sm' : 'lg')
  }
  useEffect(() => {
    checkResolution()
    window.addEventListener('resize', checkResolution)

    return function unMount() {
      window.removeEventListener('resize', checkResolution)
    }
  }, [])

  return (
    <>
      <BorderTop />
      <GridContainer>
        <GridRow>
          <GridCol lg="4">
            <ListWrapper>
              <VerticalList elements={content1} />
              <VerticalList elements={content2} />
              <VerticalList elements={content3} />
            </ListWrapper>
          </GridCol>
          <GridCol lg="4">
            <ListWrapper>
              <VerticalList elements={content4} />
              <VerticalList elements={content5} />
            </ListWrapper>
          </GridCol>
          <GridCol lg="4">
            <VerticalList elements={content6} />
            <VerticalList elements={content7} />
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol lg="12">
            {breakpoint === 'sm' ? (
              <>
                <Text>
                  &copy; 2020 Porto Seguro Cia. de Seguros
                  <br />
                  Todos os direitos reservados
                </Text>
              </>
            ) : (
              <Text>
                &copy; 2020 Porto Seguro Cia. de Seguros - Todos os direitos
                reservados
              </Text>
            )}
          </GridCol>
        </GridRow>
      </GridContainer>
    </>
  )
}

export default Footer
