import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import LinkText from './LinkText'
import Divisor from 'components/Divisor'
import VerticalList from 'components/VerticalList'
import useMedia from 'hooks/useMedia'
import { useCustomerProfile } from 'hooks/CustomerProfile/useCustomerProfile'
import { Link } from 'react-router-dom'

import {
  GridCol,
  GridContainer,
  GridRow,
  GridRowCopyright,
  FooterWrapper,
  ListWrapper,
  Logo,
  LogoText,
  LogoTitle,
  OmbudsmantContainerPhones,
  OmbudsmantLinkPhone,
  Text,
  Title,
  UppercaseBlueText,
} from './styles'

const gtmType = 'click'
const gtmClickType = 'rodape'

const messageElements = [
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

const getChatElements = (customerProfile: any) => {
  return [
    <Title bold>CHAT ONLINE</Title>,
    <LinkText
      data-gtm-type={gtmType}
      data-gtm-clicktype={gtmClickType}
      data-gtm-subname="chat"
      data-gtm-name="Converse agora com um atendente"
      hrefValue={`https://wwws.portoseguro.com.br/bot/conquista/index.html?cpf=${customerProfile.cpfCnpj}&nome=${customerProfile.customerName}`}
      target="_blank"
    >
      Converse agora com um atendente
    </LinkText>,
  ]
}

const supportElements = [
  <Title bold>CENTRAL DE ATENDIMENTO</Title>,
  <LogoText>
    Para assuntos relacionados a plataforma Conquista ligue: (11) 3366 3200
  </LogoText>,
]

const sacElements = [
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
const specialSupportElements = [
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

const ombudsmantElements = [
  <Title>OUVIDORIA</Title>,
  <OmbudsmantContainerPhones>
    <OmbudsmantLinkPhone
      data-gtm-type={gtmType}
      data-gtm-clicktype={gtmClickType}
      data-gtm-subname="ouvidoria"
      data-gtm-name="0800-727-1184"
      hrefValue="tel:0800 727 1184"
      data-testid="link-phone"
    >
      0800 727 1184
    </OmbudsmantLinkPhone>
    <OmbudsmantLinkPhone
      data-gtm-type={gtmType}
      data-gtm-clicktype={gtmClickType}
      data-gtm-subname="ouvidoria"
      data-gtm-name="(11)-3366-3184"
      hrefValue="tel:(11) 3366 3184"
    >
      (11) 3366 3184
    </OmbudsmantLinkPhone>
  </OmbudsmantContainerPhones>,
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
const serviceElements = [
  <Title>DIAS E HORÁRIOS</Title>,
  <LogoText>
    Para todos os contatos, atendimento de segunda a sexta, das 8h15 às 18h30,
    exceto feriados.
  </LogoText>,
]
const platformElements = [
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

const Footer: React.FC = () => {
  const isMobile = useMedia('sm')
  const isTablet = useMedia('lg')
  const location = useLocation()
  useCustomerProfile()
  const customerProfile = useSelector(
    (state: any) => state.customerProfile.data
  )

  return (
    <FooterWrapper>
      <Divisor />
      <GridContainer data-testid="container-footer">
        <GridRow>
          <GridCol lg={4} sm={6} xs={12}>
            <ListWrapper>
              <VerticalList elements={messageElements} />
              {customerProfile && (
                <VerticalList elements={getChatElements(customerProfile)} />
              )}
              <VerticalList elements={sacElements} />
              <VerticalList elements={supportElements} />
            </ListWrapper>
          </GridCol>
          {isMobile && <Divisor />}
          <GridCol lg={4} sm={6} xs={12}>
            <ListWrapper>
              <VerticalList elements={specialSupportElements} />
              <VerticalList elements={ombudsmantElements} />
              <VerticalList elements={serviceElements} />
            </ListWrapper>
          </GridCol>
          {(isTablet || isMobile) && <Divisor />}
          <GridCol lg={4} sm={12} md={12} xs={12}>
            <ListWrapper>
              <VerticalList elements={platformElements} />
            </ListWrapper>
          </GridCol>
        </GridRow>
        {(isMobile || isTablet) && <Divisor />}
        <GridRowCopyright locationPageHome={location.pathname}>
          <ListWrapper>
            {isMobile ? (
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
          </ListWrapper>
        </GridRowCopyright>
      </GridContainer>
    </FooterWrapper>
  )
}

export default Footer
