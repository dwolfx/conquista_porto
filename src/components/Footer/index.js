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
  FooterWrapper,
} from './styles'

const gtmType = 'click'
const gtmClickType = 'rodape'

const content1 = [
  <Title bold>CENTRAL DE ATENDIMENTO</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="central de atendimento"
    data-gtm-name="(11)3366-3370"
    hrefValue="tel:(11) 3366 3370"
  >
    (11) 3366 3370
  </LinkText>,
]
const content2 = [
  <Title>ATENDIMENTO PARA DEFICIENTES AUDITIVOS</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="atendimento para deficientes auditivos"
    data-gtm-name="0800-727-8736"
    hrefValue="tel:0800 727 8736"
  >
    0800 727 8736
  </LinkText>,
]
const content3 = [
  <Title>SAC</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="sac"
    data-gtm-name="0800-727-2763"
    hrefValue="tel:0800 727 2763"
  >
    0800 727 2763
  </LinkText>,
]
const content4 = [
  <Title>MENSAGENS</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="mensagens"
    data-gtm-name="porto.investimentos@portoseguro.com.br"
    hrefValue="mailto:porto.investimentos@portoseguro.com.br"
  >
    porto.investimentos@portoseguro.com.br
  </LinkText>,
]
const content5 = [
  <Title>OUVIDORIA</Title>,
  <HorizontalList
    noPadding
    startItems={[
      <LinkText
        data-gtm-type={gtmType}
        data-gtm-clicktype={gtmClickType}
        data-gtm-subname="ouvidoria"
        data-gtm-name="0800-727-1184"
        hrefValue="tel:0800 727 1184"
      >
        0800 727 1184
      </LinkText>,
      <LinkText
        data-gtm-type={gtmType}
        data-gtm-clicktype={gtmClickType}
        data-gtm-subname="ouvidoria"
        data-gtm-name="(11)-3366-3184"
        hrefValue="tel:(11) 3366 3184"
      >
        (11) 3366 3184
      </LinkText>,
    ]}
  />,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="ouvidoria"
    data-gtm-name="ouvidoria@portoseguro.com.br"
    hrefValue="mailto:ouvidoria@portoseguro.com.br"
  >
    ouvidoria@portoseguro.com.br
  </LinkText>,
]
const content6 = [
  <LogoTitle>UMA PLATAFORMA</LogoTitle>,
  <Logo
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="uma plataforma"
    data-gtm-name="Logo Porto-Seguro"
  />,
  <Link
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="uma plataforma"
    data-gtm-name="política de privacidade"
    to="/"
  >
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
    <FooterWrapper data-gtm-type="container" data-gtm-name="footer">
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
              <VerticalList elements={content7} />
            </ListWrapper>
          </GridCol>
          <GridCol lg="4">
            <VerticalList elements={content6} />
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
    </FooterWrapper>
  )
}

export default Footer
