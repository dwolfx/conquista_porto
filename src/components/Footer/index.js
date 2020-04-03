import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
  <Title>MENSAGENS</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="mensagens"
    data-gtm-name="suporte.conquista@portoseguro.com.br"
    hrefValue="mailto:suporte.conquista@portoseguro.com.br"
  >
    suporte.conquista@portoseguro.com.br
  </LinkText>,
]

const content3 = [
  <Title bold>CENTRAL DE ATENDIMENTO</Title>,
  <LogoText>
    Para assuntos relacionados a plataforma Conquista ligue: (11) 3366 3200
  </LogoText>,
]
const content4 = [
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
const content5 = [
  <Title>ATENDIMENTO PARA DEFICIENTES AUDITIVOS</Title>,
  <LinkText
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="atendimento deficientes auditivos"
    data-gtm-name="0800 727 8736"
    hrefValue="tel:0800 727 8736"
  >
    0800 727 8736
  </LinkText>,
]
const content6 = [
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
const content7 = [
  <Title>DIAS E HORÁRIOS</Title>,
  <LogoText>
    Para todos os contatos, atendimento de segunda a sexta,
    <br />
    das 8h15 às 18h30, exceto feriados.
  </LogoText>,
]
const content8 = [
  <LogoTitle>UMA PLATAFORMA</LogoTitle>,
  <Logo
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="uma plataforma"
    data-gtm-name="Logo Porto-Seguro"
  />,
  <Link
    target="_blank"
    data-gtm-type={gtmType}
    data-gtm-clicktype={gtmClickType}
    data-gtm-subname="uma plataforma"
    data-gtm-name="política de privacidade"
    to="/redirect?to=https://www.portoseguro.com.br/politica-de-privacidade"
  >
    <UppercaseBlueText>POLÍTICA DE PRIVACIDADE</UppercaseBlueText>
  </Link>,
]

const Footer = () => {
  const bankData = useSelector(
    state => state.bankData.data && state.bankData.data.DadosContaPortoSeguro
  )

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
    <FooterWrapper>
      <BorderTop />
      <GridContainer>
        <GridRow>
          <GridCol lg="4">
            <ListWrapper>
              <VerticalList elements={content1} />

              {bankData && (
                <VerticalList
                  elements={[
                    <Title bold>CHAT ONLINE</Title>,
                    <LinkText
                      data-gtm-type={gtmType}
                      data-gtm-clicktype={gtmClickType}
                      data-gtm-subname="chat"
                      data-gtm-name="Converse agora com um atendente"
                      hrefValue={`https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${bankData.cpf}&nome=${bankData.titular}`}
                      target="_blank"
                    >
                      Converse agora com um atendente
                    </LinkText>,
                  ]}
                />
              )}

              <VerticalList elements={content3} />
              <VerticalList elements={content4} />
            </ListWrapper>
          </GridCol>
          <GridCol lg="4">
            <ListWrapper>
              <VerticalList elements={content5} />
              <VerticalList elements={content6} />
              <VerticalList elements={content7} />
            </ListWrapper>
          </GridCol>
          <GridCol lg="4">
            <VerticalList elements={content8} />
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
